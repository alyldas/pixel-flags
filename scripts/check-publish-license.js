const dryRun = process.env.npm_config_dry_run === "true";
const permission =
  process.env.PIXEL_FLAGS_R74N_COMMERCIAL_PERMISSION === "1" ||
  process.env.PIXEL_FLAGS_R74N_COMMERCIAL_PERMISSION === "true";

if (dryRun) {
  console.log("Skipping upstream commercial permission gate for npm publish dry-run.");
} else if (!permission) {
  throw new Error(
    "Refusing real npm publish without PIXEL_FLAGS_R74N_COMMERCIAL_PERMISSION=1. The bundled PNG assets are under R74n Content License 1.1, which requires explicit permission for commercial use."
  );
} else {
  console.log("Upstream commercial permission gate passed.");
}
