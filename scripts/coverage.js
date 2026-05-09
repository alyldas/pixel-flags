import { createCoverageReport } from "./lib/build.js";

const report = createCoverageReport();

console.log(`ISO total: ${report.isoTotal}`);
console.log(`Have: ${report.have}`);
console.log(`Missing: ${report.missing.length}`);
console.log(`ISO coverage: ${report.coverage.toFixed(1)}%`);

if (report.missing.length > 0) {
  console.log("");
  console.log("Missing ISO2 codes:");
  console.log(report.missing.map((entry) => entry.code).join(" "));
}

console.log("");
console.log(`Report: ${report.outputPath}`);
console.log(`Badge: ${report.badgePath}`);
