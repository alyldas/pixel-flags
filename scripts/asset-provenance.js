import crypto from "node:crypto";
import fs from "node:fs";

import { ASSET_PROVENANCE_PATH } from "./config.js";
import { scanFlagFiles } from "./flags.js";
import { writeText } from "./utils.js";

const mode = process.argv[2] || "--check";

if (!["--check", "--write"].includes(mode)) {
  throw new Error("Usage: node scripts/asset-provenance.js [--check|--write]");
}

const provenance = buildAssetProvenance();
const serialized = `${JSON.stringify(provenance, null, 2)}\n`;

if (mode === "--write") {
  writeText(ASSET_PROVENANCE_PATH, serialized);
  console.log(`Wrote asset provenance for ${provenance.assets.length} flags.`);
} else {
  const existing = fs.existsSync(ASSET_PROVENANCE_PATH)
    ? fs.readFileSync(ASSET_PROVENANCE_PATH, "utf8")
    : "";

  if (existing !== serialized) {
    throw new Error(
      "Asset provenance is out of date. Run `node scripts/asset-provenance.js --write`."
    );
  }

  console.log(`Validated asset provenance for ${provenance.assets.length} flags.`);
}

function buildAssetProvenance() {
  const entries = scanFlagFiles();

  return {
    schemaVersion: 1,
    upstream: {
      name: "R74n Pixel Flags",
      sourceUrl: "https://r74n.com/pixelflags/",
      licenseName: "R74n Content License 1.1",
      licenseUrl: "https://r74n.com/license.txt",
      upstreamAdvertisedFlagCount: 634,
      commercialUseRequiresPermission: true,
    },
    assets: entries.map((entry) => ({
      code: entry.code,
      name: entry.name,
      path: `flags/${entry.fileName}`,
      width: 32,
      height: 18,
      sha256: hashFile(entry.filePath),
    })),
  };
}

function hashFile(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}
