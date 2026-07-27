import assert from "node:assert/strict";
import fs from "node:fs";
import test, { after, before } from "node:test";

import { getCoverageData, getCoverageDataFromEntries } from "../scripts/lib/flag-inventory.js";
import { createCoverageReport } from "../scripts/lib/build.js";
import { createBuildFixture } from "./helpers/project-fixture.js";

let fixture;
let report;

before(() => {
  fixture = createBuildFixture("pixel-flags-coverage-");
  report = createCoverageReport(fixture.context);
});

after(() => {
  fixture.cleanup();
});

test("ISO coverage generation writes isolated badge and report artifacts", () => {
  assert.equal(report.outputPath, fixture.context.output.coveragePath);
  assert.equal(report.badgePath, fixture.context.output.coverageBadgePath);
  assert.equal(report.readmePath, fixture.context.output.readmePath);

  for (const artifactPath of [report.outputPath, report.badgePath, report.readmePath]) {
    const stat = fs.statSync(artifactPath);

    assert.ok(stat.isFile(), `Expected generated file: ${artifactPath}`);
    assert.ok(stat.size > 0, `Expected non-empty generated file: ${artifactPath}`);
  }
});

test("ISO coverage report data matches computed flag inventory", () => {
  const computed = getCoverageData(fixture.context);

  assert.equal(report.isoTotal, computed.isoTotal);
  assert.equal(report.have, computed.have);
  assert.equal(report.coverage, computed.coverage);
  assert.deepEqual(report.missing, computed.missing);
});

test("bundled flags currently cover the full ISO set", () => {
  assert.equal(report.have, report.isoTotal);
  assert.equal(report.missing.length, 0);
  assert.equal(report.coverage, 100);
});

test("ISO coverage data reports missing ISO codes from entries", () => {
  const complete = getCoverageData(fixture.context);
  const entriesWithoutRussia = complete.entries.filter((entry) => entry.code !== "RU");
  const report = getCoverageDataFromEntries(entriesWithoutRussia);

  assert.equal(report.isoTotal, complete.isoTotal);
  assert.equal(report.have, complete.have - 1);
  assert.equal(report.missing.length, 1);
  assert.deepEqual(report.missing[0], { code: "RU", name: "Russian Federation" });
});
