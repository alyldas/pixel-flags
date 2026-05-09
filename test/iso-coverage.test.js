import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

import { COVERAGE_BADGE_PATH, COVERAGE_PATH, README_PATH } from "../scripts/lib/config.js";
import { getCoverageData, getCoverageDataFromEntries } from "../scripts/lib/flag-inventory.js";
import { createCoverageReport } from "../scripts/lib/build.js";

test("ISO coverage generation writes the public badge and report artifacts", () => {
  const report = createCoverageReport();

  assert.equal(report.outputPath, COVERAGE_PATH);
  assert.equal(report.badgePath, COVERAGE_BADGE_PATH);
  assert.equal(report.readmePath, README_PATH);

  for (const artifactPath of [report.outputPath, report.badgePath, report.readmePath]) {
    const stat = fs.statSync(artifactPath);

    assert.ok(stat.isFile(), `Expected generated file: ${artifactPath}`);
    assert.ok(stat.size > 0, `Expected non-empty generated file: ${artifactPath}`);
  }
});

test("ISO coverage report data matches computed flag inventory", () => {
  const report = createCoverageReport();
  const computed = getCoverageData();

  assert.equal(report.isoTotal, computed.isoTotal);
  assert.equal(report.have, computed.have);
  assert.equal(report.coverage, computed.coverage);
  assert.deepEqual(report.missing, computed.missing);
});

test("bundled flags currently cover the full ISO set", () => {
  const report = createCoverageReport();

  assert.equal(report.have, report.isoTotal);
  assert.equal(report.missing.length, 0);
  assert.equal(report.coverage, 100);
});

test("ISO coverage data reports missing ISO codes from entries", () => {
  const complete = getCoverageData();
  const entriesWithoutRussia = complete.entries.filter((entry) => entry.code !== "RU");
  const report = getCoverageDataFromEntries(entriesWithoutRussia);

  assert.equal(report.isoTotal, complete.isoTotal);
  assert.equal(report.have, complete.have - 1);
  assert.equal(report.missing.length, 1);
  assert.deepEqual(report.missing[0], { code: "RU", name: "Russian Federation" });
});
