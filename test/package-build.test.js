import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test, { after, before } from "node:test";

import { getBuildEntries } from "../scripts/lib/flag-inventory.js";
import { buildPackageArtifacts } from "../scripts/lib/build.js";
import { createBuildFixture } from "./helpers/project-fixture.js";

let fixture;
let result;

before(() => {
  fixture = createBuildFixture("pixel-flags-build-");
  result = buildPackageArtifacts(fixture.context);
});

after(() => {
  fixture.cleanup();
});

test("package build generates expected artifacts", () => {
  assert.equal(result.entries.length, getBuildEntries(fixture.context).length);
  assert.equal(result.cssPath, fixture.context.output.cssPath);
  assert.equal(result.minCssPath, fixture.context.output.minCssPath);

  for (const artifactPath of [result.cssPath, result.minCssPath]) {
    const stat = fs.statSync(artifactPath);

    assert.ok(stat.isFile(), `Expected generated file: ${artifactPath}`);
    assert.ok(stat.size > 0, `Expected non-empty generated file: ${artifactPath}`);
  }
});

test("build entries have matching flag assets", () => {
  assert.equal(result.entries.length, getBuildEntries(fixture.context).length);

  for (const entry of result.entries) {
    assert.ok(fs.existsSync(path.join(fixture.context.source.flagsDir, `${entry.slug}.png`)));
  }
});

test("generated stylesheet artifacts are present and minified", () => {
  const cssStat = fs.statSync(result.cssPath);
  const minCssStat = fs.statSync(result.minCssPath);

  assert.ok(cssStat.size > 0);
  assert.ok(minCssStat.size > 0);
  assert.ok(minCssStat.size < cssStat.size);
});

test("build returns complete coverage metadata", () => {
  const { coverage, entries } = result;

  assert.equal(coverage.entries.length, entries.length);
  assert.equal(coverage.have, coverage.isoTotal);
  assert.equal(coverage.missing.length, 0);
  assert.equal(coverage.coverage, 100);
});
