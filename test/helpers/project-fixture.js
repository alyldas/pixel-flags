import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { createBuildContext, PROJECT_ROOT } from "../../scripts/lib/config.js";
import { removeOwnedTree } from "../../scripts/lib/utils.js";

const PACKAGE_SOURCE_FILES = ["CHANGELOG.md", "LICENSE", "NOTICE.md", "README.md", "package.json"];

export function createBuildFixture(prefix) {
  const outputRoot = fs.mkdtempSync(path.join(os.tmpdir(), prefix));

  try {
    return {
      rootDir: outputRoot,
      context: createBuildContext({ sourceRoot: PROJECT_ROOT, outputRoot }),
      cleanup() {
        removeOwnedTree(outputRoot);
      },
    };
  } catch (error) {
    removeOwnedTree(outputRoot);
    throw error;
  }
}

export function createPackageFixture() {
  const fixture = createTempWorkspace("pixel-flags-package-");

  try {
    for (const fileName of PACKAGE_SOURCE_FILES) {
      fs.copyFileSync(path.join(PROJECT_ROOT, fileName), path.join(fixture.rootDir, fileName));
    }
    fs.cpSync(path.join(PROJECT_ROOT, "flags"), path.join(fixture.rootDir, "flags"), {
      recursive: true,
    });

    return {
      ...fixture,
      context: createBuildContext({
        sourceRoot: fixture.rootDir,
        outputRoot: fixture.rootDir,
      }),
    };
  } catch (error) {
    fixture.cleanup();
    throw error;
  }
}

export function createTempWorkspace(prefix) {
  const rootDir = fs.mkdtempSync(path.join(os.tmpdir(), prefix));

  return {
    rootDir,
    cleanup() {
      removeOwnedTree(rootDir);
    },
  };
}
