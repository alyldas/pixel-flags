import { buildPackageArtifacts } from "./lib/build.js";

const result = buildPackageArtifacts();

console.log(`Built ${result.entries.length} package flag entries.`);
console.log(`CSS: ${result.cssPath}`);
console.log(`Minified CSS: ${result.minCssPath}`);
