import path from "node:path";

import { PROJECT_ROOT, ROOT_LEGACY_ARTIFACT_PATHS } from "./config.js";
import { removeFileIfExists, removeOwnedTree } from "./safe-fs.js";

const generatedFiles = [path.join(PROJECT_ROOT, "release-notes.md"), ...ROOT_LEGACY_ARTIFACT_PATHS];
const generatedTrees = [path.join(PROJECT_ROOT, "_site")];

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
