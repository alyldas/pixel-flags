import path from "node:path";

import { DEFAULT_BUILD_CONTEXT } from "./config.js";
import {
  buildFavicon,
  buildRobotsTxt,
  buildSitemap,
  buildSocialCardSvg,
  buildWebManifest,
} from "./site-assets.js";
import { buildSiteHtml, readSiteSource } from "./site-page.js";
import { ensureDir, writeText } from "./utils.js";

export async function writeSiteArtifacts(
  contextValue = DEFAULT_BUILD_CONTEXT,
  entries,
  coverage,
  renderSocialCardPng
) {
  const context = contextValue;
  const {
    siteDir,
    htmlPath,
    robotsPath,
    sitemapPath,
    faviconPath,
    socialCardPngPath,
    manifestPath,
  } = context.output;

  ensureDir(siteDir);

  writeText(htmlPath, buildSiteHtml(context, entries, coverage));
  const appPath = path.join(siteDir, "app.js");
  const stylePath = path.join(siteDir, "style.css");

  writeText(appPath, readSiteSource(context.source.siteClientSourcePath));
  writeText(stylePath, readSiteSource(context.source.siteStyleSourcePath));
  writeText(robotsPath, buildRobotsTxt(context));
  writeText(sitemapPath, buildSitemap(context));
  writeText(faviconPath, buildFavicon());
  await renderSocialCardPng(buildSocialCardSvg(context, coverage), socialCardPngPath);

  writeText(manifestPath, buildWebManifest(context));

  return {
    appPath,
    stylePath,
    htmlPath,
    robotsPath,
    sitemapPath,
    faviconPath,
    socialCardPngPath,
    manifestPath,
  };
}
