import path from "node:path";

import { PROJECT_ROOT } from "./lib/config.js";
import { removeFileIfExists, removeOwnedTree } from "./lib/safe-fs.js";

const generatedFiles = [];
const generatedTrees = [
  path.join(PROJECT_ROOT, "badges"),
  path.join(PROJECT_ROOT, "reports"),
  path.join(PROJECT_ROOT, "site"),
  path.join(PROJECT_ROOT, "_site"),
  path.join(PROJECT_ROOT, "draft"),
  path.join(PROJECT_ROOT, ".npm-cache"),
];

let removed = 0;

for (const targetPath of generatedFiles) {
  if (removeFileIfExists(targetPath)) {
    removed += 1;
  }
}

for (const targetPath of generatedTrees) {
  if (removeOwnedTree(targetPath)) {
    removed += 1;
  }
}

console.log(`Removed ${removed} generated build artifact path${removed === 1 ? "" : "s"}.`);
