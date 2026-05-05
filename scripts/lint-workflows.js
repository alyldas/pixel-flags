import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

import { PROJECT_ROOT } from "./config.js";

const workflowsDir = path.join(PROJECT_ROOT, ".github", "workflows");
const workflowFiles = fs
  .readdirSync(workflowsDir)
  .filter((fileName) => /\.ya?ml$/.test(fileName))
  .sort((left, right) => left.localeCompare(right))
  .map((fileName) => path.join(".github", "workflows", fileName));

if (workflowFiles.length === 0) {
  throw new Error("No GitHub workflow files found.");
}

const command = process.platform === "win32" ? "github-actionlint.cmd" : "github-actionlint";
const result = spawnSync(command, workflowFiles, {
  cwd: PROJECT_ROOT,
  stdio: "inherit",
  env: {
    ...process.env,
    ACTIONLINT_CACHE_DIR: path.join(PROJECT_ROOT, ".npm-cache", "actionlint"),
  },
});

if (typeof result.status === "number") {
  process.exit(result.status);
}

process.exit(1);
