import { buildProject } from "./lib/build.js";

const result = await buildProject();

console.log(`Built ${result.entries.length} flags.`);
console.log(`CSS: ${result.cssPath}`);
console.log(`Minified CSS: ${result.minCssPath}`);
console.log(`Site: ${result.htmlPath}`);
