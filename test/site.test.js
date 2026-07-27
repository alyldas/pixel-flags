import assert from "node:assert/strict";
import fs from "node:fs";
import test, { after, before } from "node:test";

import { getBuildEntries } from "../scripts/lib/flag-inventory.js";
import { buildProject } from "../scripts/lib/build.js";
import { createBuildFixture } from "./helpers/project-fixture.js";

let fixture;
let result;

before(async () => {
  fixture = createBuildFixture("pixel-flags-site-");
  result = await buildProject(fixture.context);
});

after(() => {
  fixture.cleanup();
});

test("site build generates expected artifacts", () => {
  assert.equal(result.entries.length, getBuildEntries(fixture.context).length);
  assert.equal(result.htmlPath, fixture.context.output.htmlPath);
  assert.equal(result.robotsPath, fixture.context.output.robotsPath);
  assert.equal(result.sitemapPath, fixture.context.output.sitemapPath);
  assert.equal(result.faviconPath, fixture.context.output.faviconPath);
  assert.equal(result.socialCardPngPath, fixture.context.output.socialCardPngPath);
  assert.equal(result.manifestPath, fixture.context.output.manifestPath);
  assert.ok(result.appPath.endsWith("app.js"));
  assert.ok(result.stylePath.endsWith("style.css"));

  for (const artifactPath of [
    result.htmlPath,
    result.robotsPath,
    result.sitemapPath,
    result.faviconPath,
    result.socialCardPngPath,
    result.manifestPath,
    result.appPath,
    result.stylePath,
  ]) {
    const stat = fs.statSync(artifactPath);

    assert.ok(stat.isFile(), `Expected generated file: ${artifactPath}`);
    assert.ok(stat.size > 0, `Expected non-empty generated file: ${artifactPath}`);
  }
});

test("generated site keeps the expected static browser contract", () => {
  const html = fs.readFileSync(result.htmlPath, "utf8");
  const app = fs.readFileSync(result.appPath, "utf8");
  const style = fs.readFileSync(result.stylePath, "utf8");

  assert.equal(countMatches(html, "data-flag-card"), result.entries.length);
  assert.ok(html.includes(`data-visible-count>${result.coverage.have}<`));
  assert.match(html, /data-search/);
  assert.match(html, /class="pf pf-ru"/);
  assert.doesNotMatch(html, /v-model|v-for|v-cloak|\{\{/);
  assert.doesNotMatch(html, /%%[A-Z_]+%%/);
  assert.match(html, /<link rel="stylesheet" href=".\/css\/pixel-flags\.css" \/>/);
  assert.match(html, /<link rel="stylesheet" href=".\/style\.css" \/>/);
  assert.match(html, /<script src=".\/app\.js"><\/script>/);
  assert.match(html, /<link rel="icon" href=".\/favicon\.svg" type="image\/svg\+xml" \/>/);
  assert.match(html, /<link rel="manifest" href=".\/site\.webmanifest" \/>/);
  assert.match(app, /querySelector\("\[data-search\]"\)/);
  assert.match(app, /card\.hidden = !visible/);
  assert.match(style, /\.flags-grid/);
  assert.ok(fs.readFileSync(result.cssPath, "utf8").includes(".pf-ru"));
});

test("generated site metadata artifacts are valid", () => {
  const html = fs.readFileSync(result.htmlPath, "utf8");
  const structuredData = JSON.parse(
    html.match(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/)[1]
  );

  assert.equal(structuredData["@type"], "SoftwareSourceCode");
  assert.equal(structuredData.name, "Pixel Flags");
  assert.equal(structuredData.url, fixture.context.siteUrl);
  assert.equal(structuredData.softwareVersion, fixture.context.packageVersion);
  assert.equal(
    structuredData.releaseNotes,
    `${result.coverage.have}/${result.coverage.isoTotal} ISO codes currently available.`
  );

  const manifest = JSON.parse(fs.readFileSync(result.manifestPath, "utf8"));
  assert.equal(manifest.name, "Pixel Flags");
  assert.equal(manifest.short_name, "Pixel Flags");
  assert.equal(manifest.icons[0].type, "image/svg+xml");

  assert.ok(
    fs
      .readFileSync(result.robotsPath, "utf8")
      .includes(`Sitemap: ${fixture.context.siteUrl}sitemap.xml`)
  );
  assert.ok(
    fs.readFileSync(result.sitemapPath, "utf8").includes(`<loc>${fixture.context.siteUrl}</loc>`)
  );
});

function countMatches(value, needle) {
  return value.split(needle).length - 1;
}
