import crypto from "node:crypto";
import fs from "node:fs";

import { ASSET_PROVENANCE_PATH, FLAG_RATIO } from "./config.js";
import { scanFlagFiles } from "./flag-inventory.js";
import { writeText } from "./utils.js";

export function buildAssetProvenance() {
  const entries = scanFlagFiles();

  return {
    schemaVersion: 1,
    source: {
      name: "Pixel Flags native 32x18 drawings",
      registryPath: "scripts/flag-art/flags.js",
      recipePath: "scripts/flag-art/detailed-flags.js",
      rendererPath: "scripts/flag-art/painter.js",
      entrypointPath: "scripts/draw-pixel-flags.js",
      visualFormatInspiration: {
        name: "R74n PixelFlags",
        url: "https://r74n.com/pixelflags/",
        note: "Referenced as visual format inspiration only; no upstream PNG assets are bundled.",
      },
      licenseName: "MIT",
      licensePath: "LICENSE",
      upstreamAssetsBundled: false,
    },
    assets: entries.map((entry) => ({
      code: entry.code,
      name: entry.name,
      path: `flags/${entry.fileName}`,
      width: FLAG_RATIO.width,
      height: FLAG_RATIO.height,
      sha256: hashFile(entry.filePath),
    })),
  };
}

export function serializeAssetProvenance(provenance = buildAssetProvenance()) {
  return `${JSON.stringify(provenance, null, 2)}\n`;
}

export function checkAssetProvenance() {
  const serialized = serializeAssetProvenance();
  const existing = fs.existsSync(ASSET_PROVENANCE_PATH)
    ? fs.readFileSync(ASSET_PROVENANCE_PATH, "utf8")
    : "";

  if (existing !== serialized) {
    throw new Error("Asset provenance is out of date. Run `npm run generate:provenance`.");
  }

  return JSON.parse(serialized);
}

export function writeAssetProvenance() {
  const provenance = buildAssetProvenance();

  writeText(ASSET_PROVENANCE_PATH, serializeAssetProvenance(provenance));
  return provenance;
}

function hashFile(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}
