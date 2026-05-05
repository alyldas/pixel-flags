import path from "node:path";

import {
  FAVICON_PATH,
  HTML_PATH,
  MANIFEST_PATH,
  PROJECT_ROOT,
  ROBOTS_PATH,
  SITE_DIR,
  SITEMAP_PATH,
  SOCIAL_CARD_PNG_PATH,
  SOCIAL_CARD_SVG_PATH,
} from "./config.js";
import {
  buildFavicon,
  buildRobotsTxt,
  buildSitemap,
  buildSocialCardSvg,
  buildWebManifest,
} from "./site-assets.js";
import { buildSiteHtml } from "./site-html.js";
import { ensureDir, writeText } from "./utils.js";

export async function writeSiteArtifacts(rootDir, entries, coverage, renderSocialCardPng) {
  const siteDir = rootDir === PROJECT_ROOT ? SITE_DIR : path.join(rootDir, "site");
  const htmlPath = rootDir === PROJECT_ROOT ? HTML_PATH : path.join(siteDir, "index.html");
  const robotsPath = rootDir === PROJECT_ROOT ? ROBOTS_PATH : path.join(siteDir, "robots.txt");
  const sitemapPath = rootDir === PROJECT_ROOT ? SITEMAP_PATH : path.join(siteDir, "sitemap.xml");
  const faviconPath = rootDir === PROJECT_ROOT ? FAVICON_PATH : path.join(siteDir, "favicon.svg");
  const socialCardSvgPath =
    rootDir === PROJECT_ROOT ? SOCIAL_CARD_SVG_PATH : path.join(siteDir, "social-card.svg");
  const socialCardPngPath =
    rootDir === PROJECT_ROOT ? SOCIAL_CARD_PNG_PATH : path.join(siteDir, "social-card.png");
  const manifestPath =
    rootDir === PROJECT_ROOT ? MANIFEST_PATH : path.join(siteDir, "site.webmanifest");

  ensureDir(siteDir);

  writeText(htmlPath, buildSiteHtml(entries, coverage));
  writeText(robotsPath, buildRobotsTxt());
  writeText(sitemapPath, buildSitemap());
  writeText(faviconPath, buildFavicon());

  const socialCardSvg = buildSocialCardSvg(coverage);
  writeText(socialCardSvgPath, socialCardSvg);
  await renderSocialCardPng(socialCardSvgPath, socialCardPngPath);

  writeText(manifestPath, buildWebManifest());

  return {
    htmlPath,
    robotsPath,
    sitemapPath,
    faviconPath,
    socialCardSvgPath,
    socialCardPngPath,
    manifestPath,
  };
}
