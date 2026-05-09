import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import path from "node:path";

import { PROJECT_ROOT } from "./lib/config.js";
import { getBuildEntries } from "./lib/flag-inventory.js";

const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
const localCache = path.join(PROJECT_ROOT, ".npm-cache");
const forbiddenPrefixes = [".github/", "badges/", "reports/", "site/", "scripts/", "test/"];

const result = spawnSync(npmCommand, ["pack", "--json", "--dry-run"], {
  cwd: PROJECT_ROOT,
  encoding: "utf8",
  env: {
    ...process.env,
    npm_config_cache: localCache,
  },
});

if (result.status !== 0) {
  process.stderr.write(result.stderr || result.stdout || "npm pack failed.\n");
  process.exit(result.status ?? 1);
}

const stdout = result.stdout.trim();
const packInfo = JSON.parse(stdout);
const files = packInfo[0]?.files?.map((file) => file.path).sort() ?? [];
const fileSet = new Set(files);
const expectedFlags = getBuildEntries().map((entry) => `flags/${entry.slug}.png`);
const requiredExact = [
  "CHANGELOG.md",
  "LICENSE",
  "NOTICE.md",
  "README.md",
  "css/pixel-flags.css",
  "css/pixel-flags.min.css",
  "flags/provenance.json",
  "package.json",
];
const forbiddenExact = [
  "CONTRIBUTING.md",
  "favicon.svg",
  "index.html",
  "robots.txt",
  "site.webmanifest",
  "sitemap.xml",
  "social-card.png",
];

for (const filePath of requiredExact) {
  assert.ok(fileSet.has(filePath), `Missing required packed file: ${filePath}`);
}

for (const filePath of expectedFlags) {
  assert.ok(fileSet.has(filePath), `Missing packed flag asset: ${filePath}`);
}

for (const filePath of files) {
  const allowed =
    requiredExact.includes(filePath) ||
    expectedFlags.includes(filePath) ||
    /^css\/pixel-flags(?:\.min)?\.css$/.test(filePath) ||
    /^flags\/(?:[a-z]{2}\.png|provenance\.json)$/.test(filePath);

  assert.ok(allowed, `Unexpected packed file: ${filePath}`);
  assert.ok(!forbiddenExact.includes(filePath), `Forbidden packed file: ${filePath}`);
  assert.ok(
    !forbiddenPrefixes.some((prefix) => filePath.startsWith(prefix)),
    `Forbidden packed path: ${filePath}`
  );
}

console.log(`Packed files: ${files.length}`);
console.log(`Packed flags: ${expectedFlags.length}`);
