import { GENERATED_ROOTS } from "./lib/config.js";
import { removeOwnedTree } from "./lib/utils.js";

let removed = 0;

for (const targetPath of GENERATED_ROOTS) {
  if (removeOwnedTree(targetPath)) {
    removed += 1;
  }
}

console.log(`Removed ${removed} generated build artifact path${removed === 1 ? "" : "s"}.`);
