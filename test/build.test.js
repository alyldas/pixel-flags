import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

import {
  CSS_PATH,
  FAVICON_PATH,
  HTML_PATH,
  MANIFEST_PATH,
  MIN_CSS_PATH,
  PACKAGE_VERSION,
  PROJECT_ROOT,
  ROBOTS_PATH,
  ROOT_LEGACY_ARTIFACT_PATHS,
  SITEMAP_PATH,
  SOCIAL_CARD_PNG_PATH,
  SOCIAL_CARD_SVG_PATH,
} from "../scripts/config.js";
import { getBuildEntries } from "../scripts/flags.js";
import { buildProject } from "../scripts/project.js";

test("build generates css and html outputs", async () => {
  const result = await buildProject();

  assert.equal(result.entries.length, getBuildEntries().length);
  assert.ok(fs.existsSync(CSS_PATH));
  assert.ok(fs.existsSync(MIN_CSS_PATH));
  assert.ok(fs.existsSync(HTML_PATH));
  assert.ok(fs.existsSync(ROBOTS_PATH));
  assert.ok(fs.existsSync(SITEMAP_PATH));
  assert.ok(fs.existsSync(FAVICON_PATH));
  assert.ok(fs.existsSync(SOCIAL_CARD_SVG_PATH));
  assert.ok(fs.existsSync(SOCIAL_CARD_PNG_PATH));
  assert.ok(fs.existsSync(MANIFEST_PATH));

  for (const legacyPath of ROOT_LEGACY_ARTIFACT_PATHS) {
    assert.ok(!fs.existsSync(legacyPath), `Legacy artifact still exists: ${legacyPath}`);
  }
});

test("generated brand images use the Russian flag as the representative flag", async () => {
  await buildProject();

  const favicon = fs.readFileSync(FAVICON_PATH, "utf8");
  const socialCard = fs.readFileSync(SOCIAL_CARD_SVG_PATH, "utf8");

  assert.match(favicon, /y="17\.33" width="44" height="5\.34" fill="#4f7cff"/);
  assert.match(favicon, /y="22\.67" width="44" height="5\.33" fill="#f66b4f"/);
  assert.match(socialCard, /y="60\.67" width="232" height="36\.66" fill="#4f7cff"/);
  assert.match(socialCard, /y="97\.33" width="232" height="36\.67" fill="#f66b4f"/);
});

test("generated css includes one rule per flag asset", async () => {
  await buildProject();

  const css = fs.readFileSync(CSS_PATH, "utf8");
  const entries = getBuildEntries();
  const classMatches = [...css.matchAll(/\.pf-([a-z]{2})\s*\{/g)].map((match) => match[1]);

  assert.equal(classMatches.length, entries.length);

  for (const entry of entries) {
    assert.ok(classMatches.includes(entry.slug));
    assert.ok(fs.existsSync(path.join(PROJECT_ROOT, "flags", `${entry.slug}.png`)));
  }
});

test("generated css keeps the expected base flag properties", async () => {
  await buildProject();

  const css = fs.readFileSync(CSS_PATH, "utf8");
  const minCss = fs.readFileSync(MIN_CSS_PATH, "utf8");

  assert.match(css, /display:\s*inline-block;/);
  assert.match(css, /--pf-height:\s*1em;/);
  assert.match(css, /width:\s*calc\(32 \/ 18 \* var\(--pf-height\)\);/);
  assert.match(css, /height:\s*var\(--pf-height\);/);
  assert.match(css, /image-rendering:\s*pixelated;/);
  assert.match(css, /background-size:\s*100% 100%;/);
  assert.ok(minCss.length < css.length);
});

test("generated site contains cards and source attribution", async () => {
  const { entries } = await buildProject();
  const html = fs.readFileSync(HTML_PATH, "utf8");
  const cardMatches = html.match(/<article class="flag-card" data-flag-card\b/g) ?? [];

  assert.equal(cardMatches.length, entries.length);
  assert.match(html, /flag-icons/);
  assert.match(html, /R74n Pixel Flags/);
  assert.match(html, /Search by code or country name/);
  assert.match(html, /<link rel="canonical" href="https:\/\/alyldas\.github\.io\/pixel-flags\/">/);
  assert.match(html, /property="og:title"/);
  assert.match(
    html,
    /property="og:image" content="https:\/\/alyldas\.github\.io\/pixel-flags\/social-card\.png"/
  );
  assert.match(html, /name="twitter:card" content="summary_large_image"/);
  assert.match(html, /property="og:image:type" content="image\/png"/);
  assert.match(html, /application\/ld\+json/);
  assert.match(
    html,
    new RegExp(`"softwareVersion": "${PACKAGE_VERSION.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`)
  );
});

test("generated site uses Russia for representative flag examples", async () => {
  await buildProject();

  const html = fs.readFileSync(HTML_PATH, "utf8");

  assert.match(html, /<span class="badge"><span class="pf pf-ru"/);
  assert.match(html, /aria-label="Russia"/);
  assert.match(html, /like <code>\.pf-ru<\/code>/);
});
