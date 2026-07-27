import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

import countries from "i18n-iso-countries";

import { DEFAULT_BUILD_CONTEXT, FLAG_RATIO } from "./config.js";

const require = createRequire(import.meta.url);
const en = require("i18n-iso-countries/langs/en.json");

countries.registerLocale(en);
const ISO_NAMES = countries.getNames("en", { select: "official" });
const ISO_CODES = Object.keys(ISO_NAMES).sort((left, right) => left.localeCompare(right));

/**
 * @typedef {object} FlagFileEntry
 * @property {string} code
 * @property {string} slug
 * @property {string | null} name
 * @property {string} fileName
 * @property {string} filePath
 * @property {boolean} knownIso
 */

/**
 * @typedef {object} CoverageData
 * @property {FlagFileEntry[]} entries
 * @property {{ code: string, name: string }[]} missing
 * @property {number} have
 * @property {number} isoTotal
 * @property {number} coverage
 */

function readPngSize(filePath) {
  const buffer = fs.readFileSync(filePath);

  if (buffer.length < 24) {
    throw new Error(`PNG is too small to read dimensions: ${filePath}`);
  }

  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

/**
 * @returns {FlagFileEntry[]}
 */
export function scanFlagFiles(contextValue = DEFAULT_BUILD_CONTEXT) {
  const context = contextValue;
  const flagsDir = context.source.flagsDir;

  if (!fs.existsSync(flagsDir)) {
    throw new Error(`Flags directory not found: ${flagsDir}`);
  }

  const files = fs
    .readdirSync(flagsDir)
    .filter((fileName) => fileName.endsWith(".png"))
    .sort((left, right) => left.localeCompare(right));

  if (files.length === 0) {
    throw new Error(`No PNG files found in ${flagsDir}`);
  }

  return files.map((fileName) => {
    if (!/^[a-z]{2}\.png$/.test(fileName)) {
      throw new Error(`Unsupported flag file name: ${fileName}`);
    }

    const filePath = path.join(flagsDir, fileName);
    const dimensions = readPngSize(filePath);

    if (dimensions.width !== FLAG_RATIO.width || dimensions.height !== FLAG_RATIO.height) {
      throw new Error(
        `Unexpected size for ${fileName}: ${dimensions.width}x${dimensions.height}, expected ${FLAG_RATIO.width}x${FLAG_RATIO.height}`
      );
    }

    const slug = fileName.slice(0, -4);
    const code = slug.toUpperCase();
    const name = ISO_NAMES[code] ?? null;

    return {
      code,
      slug,
      name,
      fileName,
      filePath,
      knownIso: Boolean(name),
    };
  });
}

/**
 * @returns {FlagFileEntry[]}
 */
export function getBuildEntries(contextValue = DEFAULT_BUILD_CONTEXT) {
  const entries = scanFlagFiles(contextValue);
  const unknownEntries = entries.filter((entry) => !entry.knownIso);

  if (unknownEntries.length > 0) {
    const codes = unknownEntries.map((entry) => entry.code).join(", ");
    throw new Error(`Cannot build demo for non-ISO codes: ${codes}`);
  }

  return entries;
}

/**
 * @returns {CoverageData}
 */
export function getCoverageData(contextValue = DEFAULT_BUILD_CONTEXT) {
  return getCoverageDataFromEntries(scanFlagFiles(contextValue));
}

/**
 * @param {FlagFileEntry[]} entries
 * @returns {CoverageData}
 */
export function getCoverageDataFromEntries(entries) {
  const knownCodes = new Set(entries.filter((entry) => entry.knownIso).map((entry) => entry.code));
  const missing = ISO_CODES.filter((code) => !knownCodes.has(code)).map((code) => ({
    code,
    name: ISO_NAMES[code],
  }));
  const have = knownCodes.size;
  const coverage = (have / ISO_CODES.length) * 100;

  return {
    entries,
    have,
    isoTotal: ISO_CODES.length,
    missing,
    coverage,
  };
}
