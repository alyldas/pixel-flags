import { checkAssetProvenance, writeAssetProvenance } from "./lib/provenance.js";

const command = process.argv[2];

if (command === "check") {
  const provenance = checkAssetProvenance();
  console.log(`Validated asset provenance for ${provenance.assets.length} flags.`);
} else if (command === "write") {
  const provenance = writeAssetProvenance();
  console.log(`Wrote asset provenance for ${provenance.assets.length} flags.`);
} else {
  console.error("Usage: node scripts/provenance.js <check|write>");
  process.exit(1);
}
