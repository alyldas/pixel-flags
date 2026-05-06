import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

import { COVERAGE_BADGE_PATH, COVERAGE_PATH, README_PATH } from "../scripts/config.js";
import { getCoverageData, getCoverageDataFromEntries } from "../scripts/flags.js";
import { createCoverageReport } from "../scripts/project.js";

test("coverage generation writes expected artifacts", () => {
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

test("coverage report data matches computed flag coverage", () => {
  const report = createCoverageReport();
  const computed = getCoverageData();

  assert.equal(report.isoTotal, computed.isoTotal);
  assert.equal(report.have, computed.have);
  assert.equal(report.coverage, computed.coverage);
  assert.deepEqual(report.missing, computed.missing);
});

test("coverage data reports missing ISO codes from entries", () => {
  const complete = getCoverageData();
  const removedEntry = complete.entries.find((entry) => entry.knownIso);

  assert.ok(removedEntry, "Expected at least one known ISO flag entry");

  const report = getCoverageDataFromEntries(
    complete.entries.filter((entry) => entry.code !== removedEntry.code)
  );

  assert.equal(report.isoTotal, complete.isoTotal);
  assert.equal(report.have, complete.have - 1);
  assert.ok(report.missing.some((entry) => entry.code === removedEntry.code));
});
