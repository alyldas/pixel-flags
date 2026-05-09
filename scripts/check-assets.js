import fs from "node:fs";

import sharp from "sharp";

import { flags } from "./flag-art/flags.js";
import { Painter } from "./flag-art/painter.js";
import { getCoverageDataFromEntries, scanFlagFiles } from "./lib/flag-inventory.js";

const entries = scanFlagFiles();
const unknownEntries = entries.filter((entry) => !entry.knownIso);
const coverage = getCoverageDataFromEntries(entries);
const assetCodes = entries
  .map((entry) => entry.slug)
  .sort((left, right) => left.localeCompare(right));
const recipeCodes = Object.keys(flags).sort((left, right) => left.localeCompare(right));

if (unknownEntries.length > 0) {
  const codes = unknownEntries.map((entry) => entry.code).join(", ");
  throw new Error(`Unknown ISO flag assets: ${codes}`);
}

if (coverage.missing.length > 0) {
  const codes = coverage.missing.map((entry) => entry.code).join(", ");
  throw new Error(`Missing ISO flag assets: ${codes}`);
}

if (JSON.stringify(assetCodes) !== JSON.stringify(recipeCodes)) {
  const missingRecipes = assetCodes.filter((code) => !recipeCodes.includes(code));
  const extraRecipes = recipeCodes.filter((code) => !assetCodes.includes(code));

  throw new Error(
    `Flag recipe mismatch. Missing recipes: ${missingRecipes.join(", ") || "none"}. Extra recipes: ${extraRecipes.join(", ") || "none"}.`
  );
}

let maxColors = 0;

for (const entry of entries) {
  const { data, info } = await sharp(entry.filePath).raw().toBuffer({ resolveWithObject: true });
  const colors = new Set();

  for (let offset = 0; offset < data.length; offset += info.channels) {
    const alpha = info.channels > 3 ? data[offset + 3] : 255;

    if (alpha !== 255) {
      throw new Error(`${entry.fileName} has non-opaque alpha value: ${alpha}`);
    }

    colors.add(`${data[offset]},${data[offset + 1]},${data[offset + 2]}`);
  }

  if (colors.size > 256) {
    throw new Error(`${entry.fileName} has ${colors.size} colors; expected <= 256`);
  }

  maxColors = Math.max(maxColors, colors.size);

  const painter = new Painter();
  flags[entry.slug](painter);

  if (!fs.readFileSync(entry.filePath).equals(await painter.pngBuffer())) {
    throw new Error(`${entry.fileName} is out of sync with scripts/flag-art/flags.js`);
  }
}

console.log(`Validated ${entries.length} flag assets; max colors: ${maxColors}.`);
