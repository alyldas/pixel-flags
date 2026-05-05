import path from "node:path";

import {
  BADGES_DIR,
  COVERAGE_BADGE_PATH,
  COVERAGE_PATH,
  PROJECT_ROOT,
  README_COVERAGE_END,
  README_COVERAGE_START,
  README_PATH,
  REPORTS_DIR,
} from "./config.js";
import { getCoverageData } from "./flags.js";
import { ensureDir, escapeXml, formatPercent, readText, writeText } from "./utils.js";

function buildCoverageSummaryBlock(report) {
  return [
    README_COVERAGE_START,
    "",
    `- ISO total: \`${report.isoTotal}\``,
    `- Available flags: \`${report.have}\``,
    `- Missing ISO codes: \`${report.missing.length}\``,
    `- Coverage: \`${formatPercent(report.coverage)}\``,
    "- Full details: [reports/coverage.md](reports/coverage.md)",
    README_COVERAGE_END,
  ].join("\n");
}

function syncReadmeCoverage(rootDir, report) {
  const readmePath = rootDir === PROJECT_ROOT ? README_PATH : path.join(rootDir, "README.md");
  const readme = readText(readmePath);
  const replacement = buildCoverageSummaryBlock(report);
  const pattern = new RegExp(`${README_COVERAGE_START}[\\s\\S]*?${README_COVERAGE_END}`, "m");

  if (!pattern.test(readme)) {
    throw new Error("README coverage markers are missing.");
  }

  writeText(readmePath, readme.replace(pattern, replacement));
}

function buildCoverageMarkdown(report) {
  const lines = [
    "# Coverage Report",
    "",
    `- ISO total: ${report.isoTotal}`,
    `- Have: ${report.have}`,
    `- Missing: ${report.missing.length}`,
    `- Coverage: ${formatPercent(report.coverage)}`,
    "",
    "## Missing ISO Codes",
    "",
  ];

  if (report.missing.length === 0) {
    lines.push("No missing ISO codes.");
  } else {
    lines.push("| Code | Name |");
    lines.push("| --- | --- |");

    for (const entry of report.missing) {
      lines.push(`| ${entry.code} | ${entry.name} |`);
    }
  }

  lines.push("");

  return lines.join("\n");
}

function getCoverageBadgeColor(coverage) {
  if (coverage >= 95) return "#2ea043";
  if (coverage >= 85) return "#4caf50";
  if (coverage >= 70) return "#dfb317";
  return "#d73a49";
}

function buildCoverageBadge(report) {
  const label = "ISO coverage";
  const value = formatPercent(report.coverage);
  const labelWidth = 88;
  const valueWidth = Math.max(46, 12 + value.length * 8);
  const totalWidth = labelWidth + valueWidth;
  const color = getCoverageBadgeColor(report.coverage);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="20" role="img" aria-label="${escapeXml(`${label}: ${value}`)}">
  <linearGradient id="smooth" x2="0" y2="100%">
    <stop offset="0" stop-color="#ffffff" stop-opacity=".1"/>
    <stop offset="1" stop-opacity=".1"/>
  </linearGradient>
  <mask id="round">
    <rect width="${totalWidth}" height="20" rx="3" fill="#fff"/>
  </mask>
  <g mask="url(#round)">
    <rect width="${labelWidth}" height="20" fill="#555"/>
    <rect x="${labelWidth}" width="${valueWidth}" height="20" fill="${color}"/>
    <rect width="${totalWidth}" height="20" fill="url(#smooth)"/>
  </g>
  <g fill="#fff" text-anchor="middle" font-family="Verdana, DejaVu Sans, Geneva, sans-serif" font-size="11">
    <text x="${labelWidth / 2}" y="15" fill="#010101" fill-opacity=".3">${escapeXml(label)}</text>
    <text x="${labelWidth / 2}" y="14">${escapeXml(label)}</text>
    <text x="${labelWidth + valueWidth / 2}" y="15" fill="#010101" fill-opacity=".3">${escapeXml(value)}</text>
    <text x="${labelWidth + valueWidth / 2}" y="14">${escapeXml(value)}</text>
  </g>
</svg>
`;
}

export function createCoverageReport(rootDir = PROJECT_ROOT) {
  const report = getCoverageData(rootDir);
  const reportsDir = rootDir === PROJECT_ROOT ? REPORTS_DIR : path.join(rootDir, "reports");
  const badgesDir = rootDir === PROJECT_ROOT ? BADGES_DIR : path.join(rootDir, "badges");
  const outputPath =
    rootDir === PROJECT_ROOT ? COVERAGE_PATH : path.join(reportsDir, "coverage.md");
  const badgePath =
    rootDir === PROJECT_ROOT ? COVERAGE_BADGE_PATH : path.join(badgesDir, "coverage.svg");
  const markdown = buildCoverageMarkdown(report);
  const badge = buildCoverageBadge(report);

  ensureDir(reportsDir);
  ensureDir(badgesDir);

  writeText(outputPath, markdown);
  writeText(badgePath, badge);
  syncReadmeCoverage(rootDir, report);

  return {
    ...report,
    outputPath,
    markdown,
    badgePath,
    badge,
    readmePath: rootDir === PROJECT_ROOT ? README_PATH : path.join(rootDir, "README.md"),
  };
}
