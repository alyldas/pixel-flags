import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

import {
  CSS_PATH,
  FAVICON_PATH,
  HTML_PATH,
  MANIFEST_PATH,
  PACKAGE_VERSION,
  PROJECT_ROOT,
  ROBOTS_PATH,
  SITEMAP_PATH,
  SITE_URL,
  SOCIAL_CARD_PNG_PATH,
} from "../scripts/lib/config.js";
import { getBuildEntries } from "../scripts/lib/flag-inventory.js";
import { buildProject } from "../scripts/lib/build.js";

const SITE_ARTIFACT_PATHS = [
  HTML_PATH,
  ROBOTS_PATH,
  SITEMAP_PATH,
  FAVICON_PATH,
  SOCIAL_CARD_PNG_PATH,
  MANIFEST_PATH,
];

test("site build generates expected artifacts", async () => {
  const result = await buildProject();

  assert.equal(result.entries.length, getBuildEntries().length);
  assert.equal(result.htmlPath, HTML_PATH);
  assert.equal(result.robotsPath, ROBOTS_PATH);
  assert.equal(result.sitemapPath, SITEMAP_PATH);
  assert.equal(result.faviconPath, FAVICON_PATH);
  assert.equal(result.socialCardPngPath, SOCIAL_CARD_PNG_PATH);
  assert.equal(result.manifestPath, MANIFEST_PATH);
  assert.ok(result.appPath.endsWith("app.js"));
  assert.ok(result.stylePath.endsWith("style.css"));

  for (const artifactPath of [...SITE_ARTIFACT_PATHS, result.appPath, result.stylePath]) {
    const stat = fs.statSync(artifactPath);

    assert.ok(stat.isFile(), `Expected generated file: ${artifactPath}`);
    assert.ok(stat.size > 0, `Expected non-empty generated file: ${artifactPath}`);
  }
});

test("generated site keeps the expected static browser contract", async () => {
  await buildProject();

  const html = fs.readFileSync(HTML_PATH, "utf8");
  const app = fs.readFileSync(path.join(PROJECT_ROOT, "site", "app.js"), "utf8");
  const style = fs.readFileSync(path.join(PROJECT_ROOT, "site", "style.css"), "utf8");

  assert.equal(countMatches(html, "data-flag-card"), getBuildEntries().length);
  assert.match(html, /data-visible-count>250</);
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
  assert.ok(fs.readFileSync(CSS_PATH, "utf8").includes(".pf-ru"));
});

test("generated site metadata artifacts are valid", async () => {
  await buildProject();

  const html = fs.readFileSync(HTML_PATH, "utf8");
  const structuredData = JSON.parse(
    html.match(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/)[1]
  );

  assert.equal(structuredData["@type"], "SoftwareSourceCode");
  assert.equal(structuredData.name, "Pixel Flags");
  assert.equal(structuredData.url, SITE_URL);
  assert.equal(structuredData.softwareVersion, PACKAGE_VERSION);
  assert.equal(structuredData.releaseNotes, "250/250 ISO codes currently available.");

  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
  assert.equal(manifest.name, "Pixel Flags");
  assert.equal(manifest.short_name, "Pixel Flags");
  assert.equal(manifest.icons[0].type, "image/svg+xml");

  assert.ok(fs.readFileSync(ROBOTS_PATH, "utf8").includes(`Sitemap: ${SITE_URL}sitemap.xml`));
  assert.ok(fs.readFileSync(SITEMAP_PATH, "utf8").includes(`<loc>${SITE_URL}</loc>`));
});

function countMatches(value, needle) {
  return value.split(needle).length - 1;
}
