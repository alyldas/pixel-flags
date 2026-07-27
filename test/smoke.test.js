import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { pathToFileURL } from "node:url";

import { chromium } from "playwright";
import sharp from "sharp";

import { DEFAULT_BUILD_CONTEXT } from "../scripts/lib/config.js";
import { getBuildEntries } from "../scripts/lib/flag-inventory.js";
import { buildProject } from "../scripts/lib/build.js";
import { removeOwnedTree } from "../scripts/lib/utils.js";
import { createBuildFixture, createTempWorkspace } from "./helpers/project-fixture.js";

const smokeArtifactDir = process.env.PIXEL_FLAGS_SMOKE_ARTIFACT_DIR?.trim() || "";
const shouldBuildProject = process.env.PIXEL_FLAGS_SMOKE_SKIP_BUILD !== "1";

test("site smoke test loads and filters flags in a real browser", async () => {
  let buildFixture;
  let buildContext = DEFAULT_BUILD_CONTEXT;
  let fixture;
  let browser;
  let browserContext;
  let page;

  try {
    if (shouldBuildProject) {
      buildFixture = createBuildFixture("pixel-flags-site-");
      buildContext = buildFixture.context;
      await buildProject(buildContext);
    }

    assert.ok(fs.existsSync(buildContext.output.htmlPath));
    fixture = stageSmokeFixture(buildContext);
    const expectedTotal = String(getBuildEntries(buildContext).length);

    browser = await chromium.launch({
      headless: true,
    });
    browserContext = await browser.newContext({ deviceScaleFactor: 1 });
    page = await browserContext.newPage();

    try {
      await page.goto(pathToFileURL(fixture.indexPath).href, { waitUntil: "load" });

      await page.waitForSelector("h1");
      await expectText(page.title(), "Pixel Flags | CSS Pixel-Art Country Flags");
      await expectText(page.locator("h1").textContent(), "Pixel Flags");
      await expectText(page.locator("[data-visible-count]").textContent(), expectedTotal);

      await page.getByLabel("Search flags").fill("japan");
      await waitForVisibleFlagCount(page, "1");
      await expectText(page.locator("[data-visible-count]").textContent(), "1");
      await expectText(page.locator(".flag-card:not([hidden]) strong").textContent(), "JP");

      const screenshot = await renderFlagScreenshot(page, "ru");
      await expectRussianFlagPixels(screenshot);
    } catch (error) {
      await captureSmokeArtifacts({ page, fixture, outputDir: smokeArtifactDir });
      throw error;
    }
  } finally {
    await browserContext?.close();
    await browser?.close();
    fixture?.cleanup();
    buildFixture?.cleanup();
  }
});

async function expectText(promise, expected) {
  assert.equal(await promise, expected);
}

async function waitForVisibleFlagCount(page, expected) {
  await page.waitForFunction(
    (expectedValue) =>
      globalThis.document.querySelector("[data-visible-count]")?.textContent === expectedValue,
    expected
  );
}

async function renderFlagScreenshot(page, code) {
  await page.evaluate((flagCode) => {
    const previous = globalThis.document.getElementById("smoke-visual");

    if (previous) {
      previous.remove();
    }

    const host = globalThis.document.createElement("div");
    host.id = "smoke-visual";
    host.style.position = "fixed";
    host.style.inset = "24px auto auto 24px";
    host.style.padding = "12px";
    host.style.background = "#ffffff";
    host.style.borderRadius = "8px";
    host.style.zIndex = "9999";
    host.innerHTML = `<span class="pf pf-${flagCode}" style="--pf-height: 54px;" aria-hidden="true"></span>`;
    globalThis.document.body.appendChild(host);
  }, code);

  const locator = page.locator("#smoke-visual .pf");
  await locator.waitFor();

  const backgroundImage = await locator.evaluate(
    (node) => globalThis.getComputedStyle(node).backgroundImage
  );
  assert.match(backgroundImage, new RegExp(`${code}\\.png`));

  const screenshot = await locator.screenshot({ type: "png" });
  writeBinaryArtifact(smokeArtifactDir, `flag-${code}.png`, screenshot);
  return screenshot;
}

async function expectRussianFlagPixels(screenshotPromise) {
  const screenshot = await screenshotPromise;
  const { data, info } = await sharp(screenshot).raw().toBuffer({ resolveWithObject: true });

  assert.equal(info.width, 96);
  assert.equal(info.height, 54);

  const top = getPixel(data, info, 48, 9);
  const middle = getPixel(data, info, 48, 27);
  const bottom = getPixel(data, info, 48, 45);

  assert.ok(
    top.r > 220 && top.g > 220 && top.b > 220,
    `Unexpected top stripe: ${formatPixel(top)}`
  );
  assert.ok(
    middle.b > 150 && middle.b > middle.r + 40 && middle.b > middle.g + 30,
    `Unexpected middle stripe: ${formatPixel(middle)}`
  );
  assert.ok(
    bottom.r > 150 && bottom.r > bottom.g + 40 && bottom.r > bottom.b + 40,
    `Unexpected bottom stripe: ${formatPixel(bottom)}`
  );
}

function getPixel(data, info, x, y) {
  const channels = info.channels;
  const offset = (y * info.width + x) * channels;

  return {
    r: data[offset],
    g: data[offset + 1],
    b: data[offset + 2],
    a: channels > 3 ? data[offset + 3] : 255,
  };
}

function formatPixel(pixel) {
  return `rgba(${pixel.r}, ${pixel.g}, ${pixel.b}, ${pixel.a})`;
}

function stageSmokeFixture(buildContext) {
  const fixture = createTempWorkspace("pixel-flags-smoke-");
  const fixtureRoot = fixture.rootDir;
  const siteDir = buildContext.output.siteDir;

  for (const entry of fs.readdirSync(siteDir)) {
    fs.cpSync(path.join(siteDir, entry), path.join(fixtureRoot, entry), { recursive: true });
  }

  fs.cpSync(buildContext.output.cssDir, path.join(fixtureRoot, "css"), { recursive: true });
  fs.cpSync(buildContext.source.flagsDir, path.join(fixtureRoot, "flags"), { recursive: true });

  return {
    rootDir: fixtureRoot,
    indexPath: path.join(fixtureRoot, "index.html"),
    cleanup: fixture.cleanup,
  };
}

async function captureSmokeArtifacts({ page, fixture, outputDir }) {
  if (!outputDir) {
    return;
  }

  ensureArtifactDir(outputDir);

  if (page) {
    await page.screenshot({
      path: path.join(outputDir, "page.png"),
      fullPage: true,
      type: "png",
    });

    const html = await page.content();
    fs.writeFileSync(path.join(outputDir, "dom.html"), html, "utf8");
  }

  if (fixture?.rootDir && fs.existsSync(fixture.rootDir)) {
    const fixtureCopyPath = path.join(outputDir, "fixture");
    if (fs.existsSync(fixtureCopyPath)) {
      removeOwnedTree(fixtureCopyPath);
    }
    fs.cpSync(fixture.rootDir, fixtureCopyPath, { recursive: true });
  }
}

function writeBinaryArtifact(outputDir, fileName, data) {
  if (!outputDir) {
    return;
  }

  ensureArtifactDir(outputDir);
  fs.writeFileSync(path.join(outputDir, fileName), data);
}

function ensureArtifactDir(outputDir) {
  fs.mkdirSync(outputDir, { recursive: true });
}
