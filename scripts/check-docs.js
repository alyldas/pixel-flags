import fs from "node:fs";
import path from "node:path";

import { PROJECT_ROOT, REPO_URL } from "./lib/config.js";

const EXCLUDED_DIRS = new Set([".git", ".npm-cache", "node_modules"]);
const MARKDOWN_LINK_PATTERN = /!?\[[^\]]*\]\(([^)\n]+)\)/g;
const REPO = new URL(REPO_URL);
const REPO_PATH_PARTS = REPO.pathname.split("/").filter(Boolean);
const REPO_OWNER = REPO_PATH_PARTS[0];
const REPO_NAME = REPO_PATH_PARTS[1];

function comparePaths(left, right) {
  return left.localeCompare(right);
}

function toPosixPath(filePath) {
  return filePath.split(path.sep).join("/");
}

function collectMarkdownFiles(relativeDir = "") {
  const absoluteDir = path.join(PROJECT_ROOT, relativeDir);
  const entries = fs.readdirSync(absoluteDir, { withFileTypes: true });
  const markdownFiles = [];

  entries.sort((left, right) => comparePaths(left.name, right.name));

  for (const entry of entries) {
    const relativePath = relativeDir ? path.join(relativeDir, entry.name) : entry.name;

    if (entry.isDirectory()) {
      if (!EXCLUDED_DIRS.has(entry.name)) {
        markdownFiles.push(...collectMarkdownFiles(relativePath));
      }
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".md")) {
      markdownFiles.push(toPosixPath(relativePath));
    }
  }

  return markdownFiles.sort(comparePaths);
}

function getLineNumber(content, index) {
  let line = 1;

  for (let cursor = 0; cursor < index; cursor += 1) {
    if (content.charCodeAt(cursor) === 10) {
      line += 1;
    }
  }

  return line;
}

function extractTarget(rawTarget) {
  let target = rawTarget.trim();

  if (!target) {
    return undefined;
  }

  if (target.startsWith("<") && target.endsWith(">")) {
    target = target.slice(1, -1).trim();
  }

  const firstWhitespace = target.search(/\s/);
  if (firstWhitespace !== -1) {
    target = target.slice(0, firstWhitespace);
  }

  return target || undefined;
}

function isIgnoredLink(target) {
  const lowered = target.toLowerCase();
  return (
    lowered.startsWith("#") ||
    lowered.startsWith("mailto:") ||
    lowered.startsWith("tel:") ||
    lowered.startsWith("data:")
  );
}

function getRepositoryFileUrlPath(target) {
  let url;

  try {
    url = new URL(target);
  } catch {
    return undefined;
  }

  const parts = url.pathname.split("/").filter(Boolean);

  if (
    url.hostname === "github.com" &&
    parts[0] === REPO_OWNER &&
    parts[1] === REPO_NAME &&
    (parts[2] === "blob" || parts[2] === "tree") &&
    parts.length > 4
  ) {
    return parts.slice(4).join("/");
  }

  if (
    url.hostname === "raw.githubusercontent.com" &&
    parts[0] === REPO_OWNER &&
    parts[1] === REPO_NAME &&
    parts.length > 3
  ) {
    return parts.slice(3).join("/");
  }

  return undefined;
}

function isExternalUrl(target) {
  try {
    const url = new URL(target);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function fileExists(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch {
    return false;
  }
}

function getLocalFileTarget(target, markdownFile) {
  const targetWithoutFragment = target.split("#")[0].split("?")[0];

  if (!targetWithoutFragment || isExternalUrl(targetWithoutFragment)) {
    return undefined;
  }

  if (targetWithoutFragment.startsWith("/")) {
    return {
      error: "absolute local paths are not allowed in markdown links",
    };
  }

  if (!path.extname(targetWithoutFragment)) {
    return undefined;
  }

  return {
    absolutePath: path.resolve(
      path.dirname(path.join(PROJECT_ROOT, markdownFile)),
      targetWithoutFragment
    ),
  };
}

const markdownFiles = collectMarkdownFiles();
const errors = [];

for (const markdownFile of markdownFiles) {
  const absoluteMarkdownPath = path.join(PROJECT_ROOT, markdownFile);
  const content = fs.readFileSync(absoluteMarkdownPath, "utf8");

  MARKDOWN_LINK_PATTERN.lastIndex = 0;

  for (
    let match = MARKDOWN_LINK_PATTERN.exec(content);
    match;
    match = MARKDOWN_LINK_PATTERN.exec(content)
  ) {
    const target = extractTarget(match[1]);

    if (!target || isIgnoredLink(target)) {
      continue;
    }

    const line = getLineNumber(content, match.index);
    const repositoryFilePath = getRepositoryFileUrlPath(target);

    if (repositoryFilePath) {
      errors.push(`${markdownFile}:${line} uses repository URL; use ${repositoryFilePath}`);
      continue;
    }

    const localTarget = getLocalFileTarget(target, markdownFile);

    if (!localTarget) {
      continue;
    }

    if (localTarget.error) {
      errors.push(`${markdownFile}:${line} ${localTarget.error}`);
      continue;
    }

    if (!fileExists(localTarget.absolutePath)) {
      const missingPath = toPosixPath(path.relative(PROJECT_ROOT, localTarget.absolutePath));
      errors.push(`${markdownFile}:${line} missing linked file: ${missingPath}`);
    }
  }
}

if (errors.length > 0) {
  console.error("Documentation link check failed.");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`Documentation link check passed for ${markdownFiles.length} markdown files.`);
