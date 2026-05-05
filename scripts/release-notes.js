import fs from "node:fs";
import path from "node:path";

import { PACKAGE_VERSION, PROJECT_ROOT } from "./config.js";

const versionArg = process.argv[2];
const outputArg = process.argv[3];
const version = versionArg || PACKAGE_VERSION;
const changelogPath = path.join(PROJECT_ROOT, "CHANGELOG.md");
const outputPath = outputArg
  ? path.resolve(PROJECT_ROOT, outputArg)
  : path.join(PROJECT_ROOT, "release-notes.md");

if (!fs.existsSync(changelogPath)) {
  throw new Error(`CHANGELOG.md was not found at ${changelogPath}`);
}

const source = fs.readFileSync(changelogPath, "utf8");
const lines = source.split(/\r?\n/);
const headingPattern = /^## \[(?<version>[^\]]+)\]\s*$/;

let sectionStart = -1;
let sectionEnd = lines.length;

for (let index = 0; index < lines.length; index += 1) {
  const line = lines[index];
  const match = line.match(headingPattern);

  if (!match) {
    continue;
  }

  const headingVersion = match.groups?.version;

  if (sectionStart === -1) {
    if (headingVersion === version) {
      sectionStart = index + 1;
    }
    continue;
  }

  sectionEnd = index;
  break;
}

if (sectionStart === -1) {
  throw new Error(`Could not find CHANGELOG section for [${version}] in ${changelogPath}`);
}

const sectionBody = lines.slice(sectionStart, sectionEnd).join("\n").trim();

if (!sectionBody) {
  throw new Error(`CHANGELOG section [${version}] is empty.`);
}

const notes = [`## ${version}`, "", sectionBody, ""].join("\n");
fs.writeFileSync(outputPath, notes, "utf8");
console.log(`Wrote release notes for v${version} to ${path.relative(PROJECT_ROOT, outputPath)}.`);
