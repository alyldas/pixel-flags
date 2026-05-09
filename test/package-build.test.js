import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

import { CSS_PATH, MIN_CSS_PATH, PROJECT_ROOT } from "../scripts/lib/config.js";
import { getBuildEntries } from "../scripts/lib/flag-inventory.js";
import { buildPackageArtifacts } from "../scripts/lib/build.js";

const BUILD_ARTIFACT_PATHS = [CSS_PATH, MIN_CSS_PATH];

test("package build generates expected artifacts", () => {
  const result = buildPackageArtifacts();

  assert.equal(result.entries.length, getBuildEntries().length);
  assert.equal(result.cssPath, CSS_PATH);
  assert.equal(result.minCssPath, MIN_CSS_PATH);

  for (const artifactPath of BUILD_ARTIFACT_PATHS) {
    const stat = fs.statSync(artifactPath);

    assert.ok(stat.isFile(), `Expected generated file: ${artifactPath}`);
    assert.ok(stat.size > 0, `Expected non-empty generated file: ${artifactPath}`);
  }
});

test("build entries have matching flag assets", () => {
  const { entries } = buildPackageArtifacts();

  assert.equal(entries.length, getBuildEntries().length);

  for (const entry of entries) {
    assert.ok(fs.existsSync(path.join(PROJECT_ROOT, "flags", `${entry.slug}.png`)));
  }
});

test("generated stylesheet artifacts are present and minified", () => {
  buildPackageArtifacts();

  const cssStat = fs.statSync(CSS_PATH);
  const minCssStat = fs.statSync(MIN_CSS_PATH);

  assert.ok(cssStat.size > 0);
  assert.ok(minCssStat.size > 0);
  assert.ok(minCssStat.size < cssStat.size);
});

test("build returns complete coverage metadata", () => {
  const { coverage, entries } = buildPackageArtifacts();

  assert.equal(coverage.entries.length, entries.length);
  assert.equal(coverage.have, coverage.isoTotal);
  assert.equal(coverage.missing.length, 0);
  assert.equal(coverage.coverage, 100);
});
