import path from "node:path";

import sharp from "sharp";

import { CSS_DIR, CSS_PATH, MIN_CSS_PATH, PROJECT_ROOT } from "./config.js";
import { getBuildEntries, getCoverageDataFromEntries } from "./flag-inventory.js";
import { writeSiteArtifacts } from "./site.js";
import { buildMinifiedStylesheet, buildStylesheet } from "./stylesheet.js";
import { ensureDir, writeText } from "./utils.js";

export { createCoverageReport } from "./coverage-report.js";

async function renderSocialCardPng(svg, pngPath) {
  await sharp(Buffer.from(svg)).png().toFile(pngPath);
}

export function buildPackageArtifacts(rootDir = PROJECT_ROOT) {
  const entries = getBuildEntries(rootDir);
  const coverage = getCoverageDataFromEntries(entries);
  const css = buildStylesheet(entries);
  const minifiedCss = buildMinifiedStylesheet(css);
  const cssDir = rootDir === PROJECT_ROOT ? CSS_DIR : path.join(rootDir, "css");
  const cssPath = rootDir === PROJECT_ROOT ? CSS_PATH : path.join(cssDir, "pixel-flags.css");
  const minCssPath =
    rootDir === PROJECT_ROOT ? MIN_CSS_PATH : path.join(cssDir, "pixel-flags.min.css");

  ensureDir(cssDir);
  writeText(cssPath, css);
  writeText(minCssPath, minifiedCss);

  return {
    entries,
    coverage,
    cssPath,
    minCssPath,
  };
}

export async function buildProject(rootDir = PROJECT_ROOT) {
  const packageArtifacts = buildPackageArtifacts(rootDir);
  const site = await writeSiteArtifacts(
    rootDir,
    packageArtifacts.entries,
    packageArtifacts.coverage,
    renderSocialCardPng
  );

  return {
    ...packageArtifacts,
    ...site,
  };
}
