import { flags } from "./flag-art/flags/index.js";
import { HEIGHT, WIDTH } from "./flag-art/constants.js";
import { Painter } from "./flag-art/painter.js";
import {
  assertSameRgbaPixels,
  readPngRgbaData,
  rgbaImageFromPainter,
  validateOpaquePalette,
} from "./lib/asset-validation.js";
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
  const assetImage = await readPngRgbaData(entry.filePath);
  const colorCount = validateOpaquePalette(entry.fileName, assetImage);

  maxColors = Math.max(maxColors, colorCount);

  const painter = new Painter();
  flags[entry.slug](painter);

  assertSameRgbaPixels(
    entry.fileName,
    assetImage,
    rgbaImageFromPainter(painter, WIDTH, HEIGHT),
    "scripts/flag-art/flags"
  );
}

console.log(`Validated ${entries.length} flag assets; max colors: ${maxColors}.`);
