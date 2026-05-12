import fs from "node:fs";
import path from "node:path";

import { FLAG_INDEX_PATH, FLAG_RECIPE_DIR } from "./lib/config.js";
import { readText, writeText } from "./lib/utils.js";

const command = process.argv[2];

if (command === "check") {
  checkFlagIndex();
} else if (command === "write") {
  writeFlagIndex();
} else {
  console.error("Usage: node scripts/flag-index.js <check|write>");
  process.exit(1);
}

function checkFlagIndex() {
  const expected = buildFlagIndex();
  const existing = fs.existsSync(FLAG_INDEX_PATH) ? readText(FLAG_INDEX_PATH) : "";

  if (existing !== expected) {
    throw new Error("Flag index is out of date. Run `npm run generate:flag-index`.");
  }

  console.log(`Validated flag index for ${getFlagCodes().length} flags.`);
}

function writeFlagIndex() {
  const codes = getFlagCodes();

  writeText(FLAG_INDEX_PATH, buildFlagIndex(codes));
  console.log(`Wrote flag index for ${codes.length} flags.`);
}

function buildFlagIndex(codes = getFlagCodes()) {
  const imports = codes
    .map((code) => `import { draw as ${getDrawName(code)} } from "./${code}.js";`)
    .join("\n");
  const entries = codes.map((code) => `  ["${code}", ${getDrawName(code)}],`).join("\n");

  return `${imports}

const flagEntries = [
${entries}
];

export const flags = Object.fromEntries(flagEntries);
`;
}

function getFlagCodes() {
  return fs
    .readdirSync(FLAG_RECIPE_DIR, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((fileName) => /^[a-z]{2}\.js$/.test(fileName))
    .map((fileName) => path.basename(fileName, ".js"))
    .sort();
}

function getDrawName(code) {
  return `draw${code[0].toUpperCase()}${code.slice(1)}`;
}
