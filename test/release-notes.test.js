import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

import { PACKAGE_VERSION, PROJECT_ROOT } from "../scripts/config.js";

test("release notes script extracts the current version section from CHANGELOG", () => {
  const outputDir = fs.mkdtempSync(path.join(os.tmpdir(), "pixel-flags-release-notes-"));
  const outputPath = path.join(outputDir, "release-notes.md");

  try {
    const result = spawnSync(
      process.execPath,
      ["scripts/release-notes.js", PACKAGE_VERSION, outputPath],
      {
        cwd: PROJECT_ROOT,
        encoding: "utf8",
      }
    );

    assert.equal(result.status, 0, result.stderr || result.stdout);
    assert.ok(fs.existsSync(outputPath));

    const notes = fs.readFileSync(outputPath, "utf8");
    assert.match(notes, new RegExp(`^## ${PACKAGE_VERSION}\\n`, "m"));
    assert.match(notes, /^### Added$/m);
  } finally {
    fs.rmSync(outputDir, { recursive: true, force: true });
  }
});
