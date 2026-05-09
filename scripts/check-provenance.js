import { checkAssetProvenance } from "./lib/provenance.js";

const provenance = checkAssetProvenance();

console.log(`Validated asset provenance for ${provenance.assets.length} flags.`);
