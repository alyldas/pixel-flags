import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

import { COVERAGE_BADGE_PATH, COVERAGE_PATH, README_PATH } from "../scripts/config.js";
import { getCoverageData } from "../scripts/flags.js";
import { createCoverageReport } from "../scripts/project.js";

test("coverage script writes the markdown report", () => {
  const report = createCoverageReport();

  assert.ok(fs.existsSync(COVERAGE_PATH));
  assert.ok(fs.existsSync(COVERAGE_BADGE_PATH));
  assert.equal(report.outputPath, COVERAGE_PATH);
  assert.equal(report.badgePath, COVERAGE_BADGE_PATH);
});

test("coverage report summary matches computed coverage", () => {
  const report = createCoverageReport();
  const markdown = fs.readFileSync(COVERAGE_PATH, "utf8");
  const computed = getCoverageData();

  assert.equal(report.isoTotal, computed.isoTotal);
  assert.equal(report.have, computed.have);
  assert.equal(report.missing.length, computed.missing.length);

  assert.match(markdown, new RegExp(`- ISO total: ${computed.isoTotal}`));
  assert.match(markdown, new RegExp(`- Have: ${computed.have}`));
  assert.match(markdown, new RegExp(`- Missing: ${computed.missing.length}`));
  assert.match(markdown, new RegExp(`- Coverage: ${computed.coverage.toFixed(1)}%`));
});

test("coverage report lists missing codes without deprecated columns", () => {
  const report = createCoverageReport();
  const markdown = fs.readFileSync(COVERAGE_PATH, "utf8");

  for (const entry of report.missing.slice(0, 5)) {
    assert.match(
      markdown,
      new RegExp(
        `\\| ${entry.code} \\| ${entry.name.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")} \\|`
      )
    );
  }
  assert.doesNotMatch(markdown, /Unexpected Files/);
  assert.doesNotMatch(markdown, /\|\s*Code\s*\|\s*Name\s*\|\s*Present\s*\|/);
});

test("coverage badge reflects the current percentage", () => {
  const report = createCoverageReport();
  const badge = fs.readFileSync(COVERAGE_BADGE_PATH, "utf8");

  assert.match(badge, /<svg/);
  assert.match(badge, new RegExp(report.coverage.toFixed(1).replace(".", "\\.") + "%"));
  assert.match(badge, /ISO coverage/);
});

test("coverage generation syncs the README summary block", () => {
  const report = createCoverageReport();
  const readme = fs.readFileSync(README_PATH, "utf8");

  assert.match(readme, /<!-- coverage:start -->/);
  assert.match(readme, /<!-- coverage:end -->/);
  assert.match(readme, new RegExp(`Available flags: \`${report.have}\``));
  assert.match(
    readme,
    new RegExp(`Coverage: \`${report.coverage.toFixed(1).replace(".", "\\.")}%\``)
  );
});

test("README uses relative repository links for coverage and preview assets", () => {
  const readme = fs.readFileSync(README_PATH, "utf8");

  assert.match(readme, /\[!\[ISO Coverage\]\(badges\/coverage\.svg\)\]\(reports\/coverage\.md\)/);
  assert.match(
    readme,
    /\[!\[Pixel Flags preview\]\(site\/social-card\.png\)\]\(site\/index\.html\)/
  );
  assert.match(readme, /\[reports\/coverage\.md\]\(reports\/coverage\.md\)/);
  assert.match(readme, /\[SECURITY\.md\]\(SECURITY\.md\)/);
  assert.doesNotMatch(readme, /github\.com\/alyldas\/pixel-flags\/blob\/main/);
  assert.doesNotMatch(readme, /raw\.githubusercontent\.com\/alyldas\/pixel-flags\/main/);
});
