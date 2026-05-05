import fs from "node:fs";
import path from "node:path";

import {
  BADGES_DIR,
  CSS_DIR,
  PROJECT_ROOT,
  REPORTS_DIR,
  ROOT_LEGACY_ARTIFACT_PATHS,
  SITE_DIR,
} from "./config.js";

const generatedPaths = [
  BADGES_DIR,
  CSS_DIR,
  REPORTS_DIR,
  SITE_DIR,
  path.join(PROJECT_ROOT, "_site"),
  path.join(PROJECT_ROOT, "release-notes.md"),
  ...ROOT_LEGACY_ARTIFACT_PATHS,
];

for (const targetPath of generatedPaths) {
  fs.rmSync(targetPath, { recursive: true, force: true });
}

console.log("Removed generated build artifacts.");
