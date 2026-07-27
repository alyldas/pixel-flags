import sharp from "sharp";

import { DEFAULT_BUILD_CONTEXT } from "./config.js";
import { getBuildEntries, getCoverageDataFromEntries } from "./flag-inventory.js";
import { writeSiteArtifacts } from "./site.js";
import { buildMinifiedStylesheet, buildStylesheet } from "./stylesheet.js";
import { ensureDir, writeText } from "./utils.js";

export { createCoverageReport } from "./coverage-report.js";

async function renderSocialCardPng(svg, pngPath) {
  await sharp(Buffer.from(svg)).png().toFile(pngPath);
}

export function buildPackageArtifacts(contextValue = DEFAULT_BUILD_CONTEXT) {
  const context = contextValue;
  const entries = getBuildEntries(context);
  const coverage = getCoverageDataFromEntries(entries);
  const css = buildStylesheet(entries);
  const minifiedCss = buildMinifiedStylesheet(css);
  const { cssDir, cssPath, minCssPath } = context.output;

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

export async function buildProject(contextValue = DEFAULT_BUILD_CONTEXT) {
  const context = contextValue;
  const packageArtifacts = buildPackageArtifacts(context);
  const site = await writeSiteArtifacts(
    context,
    packageArtifacts.entries,
    packageArtifacts.coverage,
    renderSocialCardPng
  );

  return {
    ...packageArtifacts,
    ...site,
  };
}
