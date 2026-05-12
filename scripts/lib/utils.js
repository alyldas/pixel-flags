import fs from "node:fs";
import path from "node:path";

import { GENERATED_ROOTS, REMOVABLE_TEMP_PREFIXES, REMOVABLE_TEMP_ROOT } from "./config.js";

export function ensureDir(directoryPath) {
  fs.mkdirSync(directoryPath, { recursive: true });
}

export function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

export function writeText(filePath, content) {
  fs.writeFileSync(filePath, content);
}

export function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function formatPercent(value) {
  return `${value.toFixed(1)}%`;
}

export function minifyCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}:;,])\s*/g, "$1")
    .replace(/;}/g, "}")
    .trim()
    .concat("\n");
}

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

  if (!isRemovableTree(absoluteRoot)) {
    throw new Error(`Refusing to remove tree outside generated roots: ${absoluteRoot}`);
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

  fs.rmSync(absoluteRoot, { recursive: true });
  return true;
}

function isRemovableTree(absoluteRoot) {
  if (GENERATED_ROOTS.some((generatedRoot) => isPathInside(absoluteRoot, generatedRoot))) {
    return true;
  }

  const tempParent = path.dirname(absoluteRoot);
  const tempName = path.basename(absoluteRoot);

  return (
    path.resolve(tempParent) === path.resolve(REMOVABLE_TEMP_ROOT) &&
    REMOVABLE_TEMP_PREFIXES.some((prefix) => tempName.startsWith(prefix))
  );
}
