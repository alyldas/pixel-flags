import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { PROJECT_ROOT } from "./config.js";

const allowedTreeRoots = [
  os.tmpdir(),
  path.join(PROJECT_ROOT, "badges"),
  path.join(PROJECT_ROOT, "_site"),
  path.join(PROJECT_ROOT, "draft"),
  path.join(PROJECT_ROOT, "reports"),
  path.join(PROJECT_ROOT, "site"),
  path.join(PROJECT_ROOT, ".npm-cache"),
].map((directoryPath) => path.resolve(directoryPath));

export function isPathInside(childPath, parentPath) {
  const relativePath = path.relative(path.resolve(parentPath), path.resolve(childPath));
  return relativePath === "" || (!relativePath.startsWith("..") && !path.isAbsolute(relativePath));
}

export function removeFileIfExists(filePath) {
  try {
    const stat = fs.lstatSync(filePath);

    if (!stat.isFile() && !stat.isSymbolicLink()) {
      return false;
    }

    fs.unlinkSync(filePath);
    return true;
  } catch (error) {
    if (error?.code === "ENOENT") {
      return false;
    }

    throw error;
  }
}

export function removeOwnedTree(treeRoot) {
  const absoluteRoot = path.resolve(treeRoot);

  if (!allowedTreeRoots.some((allowedRoot) => isPathInside(absoluteRoot, allowedRoot))) {
    throw new Error(`Refusing to remove tree outside allowed generated roots: ${absoluteRoot}`);
  }

  if (!fs.existsSync(absoluteRoot)) {
    return false;
  }

  const rootStat = fs.lstatSync(absoluteRoot);
  if (rootStat.isSymbolicLink()) {
    fs.unlinkSync(absoluteRoot);
    return true;
  }

  if (!rootStat.isDirectory()) {
    throw new Error(`Refusing to remove non-directory tree root: ${absoluteRoot}`);
  }

  removeTreeContents(absoluteRoot);
  fs.rmdirSync(absoluteRoot);
  return true;
}

function removeTreeContents(directoryPath) {
  for (const entry of fs.readdirSync(directoryPath, { withFileTypes: true })) {
    const entryPath = path.join(directoryPath, entry.name);

    if (entry.isDirectory()) {
      removeTreeContents(entryPath);
      fs.rmdirSync(entryPath);
      continue;
    }

    fs.unlinkSync(entryPath);
  }
}
