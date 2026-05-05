import { scanFlagFiles } from "./flags.js";

const entries = scanFlagFiles();
const unknownEntries = entries.filter((entry) => !entry.knownIso);

if (unknownEntries.length > 0) {
  const codes = unknownEntries.map((entry) => entry.code).join(", ");
  throw new Error(`Unknown ISO flag assets: ${codes}`);
}

console.log(`Validated ${entries.length} flag assets.`);
