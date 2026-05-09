import { writeAssetProvenance } from "./lib/provenance.js";

const provenance = writeAssetProvenance();

console.log(`Wrote asset provenance for ${provenance.assets.length} flags.`);
