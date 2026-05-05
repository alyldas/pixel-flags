import path from "node:path";

import sharp from "sharp";

import {
  CSS_DIR,
  CSS_PATH,
  MIN_CSS_PATH,
  PROJECT_ROOT,
  ROOT_LEGACY_ARTIFACT_PATHS,
} from "./config.js";
import { buildMinifiedStylesheet, buildStylesheet } from "./css.js";
import { getBuildEntries, getCoverageDataFromEntries } from "./flags.js";
import { writeSiteArtifacts } from "./site.js";
import { ensureDir, removeFileIfExists, writeText } from "./utils.js";

export { createCoverageReport } from "./coverage-lib.js";

async function renderSocialCardPng(svgPath, pngPath) {
  await sharp(svgPath).png().toFile(pngPath);
}

export async function buildProject(rootDir = PROJECT_ROOT) {
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

  if (rootDir === PROJECT_ROOT) {
    for (const legacyPath of ROOT_LEGACY_ARTIFACT_PATHS) {
      removeFileIfExists(legacyPath);
    }
  }

  const site = await writeSiteArtifacts(rootDir, entries, coverage, renderSocialCardPng);

  return {
    entries,
    coverage,
    cssPath,
    minCssPath,
    ...site,
  };
}
