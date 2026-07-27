import os from "node:os";

import {
  createBuildContext,
  DEFAULT_BUILD_CONTEXT,
  FLAG_RATIO,
  PROJECT_ROOT,
  README_COVERAGE_END,
  README_COVERAGE_START,
} from "./build-context.js";

export {
  createBuildContext,
  DEFAULT_BUILD_CONTEXT,
  FLAG_RATIO,
  PROJECT_ROOT,
  README_COVERAGE_END,
  README_COVERAGE_START,
};

export const PACKAGE_JSON_PATH = DEFAULT_BUILD_CONTEXT.source.packageJsonPath;
export const FLAGS_DIR = DEFAULT_BUILD_CONTEXT.source.flagsDir;
export const FLAG_RECIPE_DIR = DEFAULT_BUILD_CONTEXT.source.flagRecipeDir;
export const FLAG_INDEX_PATH = DEFAULT_BUILD_CONTEXT.source.flagIndexPath;
export const CSS_DIR = DEFAULT_BUILD_CONTEXT.output.cssDir;
export const SITE_DIR = DEFAULT_BUILD_CONTEXT.output.siteDir;
export const REPORTS_DIR = DEFAULT_BUILD_CONTEXT.output.reportsDir;
export const BADGES_DIR = DEFAULT_BUILD_CONTEXT.output.badgesDir;
export const PAGES_DIR = DEFAULT_BUILD_CONTEXT.output.pagesDir;
export const DRAFT_DIR = DEFAULT_BUILD_CONTEXT.output.draftDir;
export const NPM_CACHE_DIR = DEFAULT_BUILD_CONTEXT.output.npmCacheDir;
export const GENERATED_ROOTS = [
  BADGES_DIR,
  REPORTS_DIR,
  SITE_DIR,
  PAGES_DIR,
  DRAFT_DIR,
  NPM_CACHE_DIR,
];
export const REMOVABLE_TEMP_ROOT = os.tmpdir();
export const REMOVABLE_TEMP_PREFIXES = [
  "pixel-flags-consumer-",
  "pixel-flags-pack-",
  "pixel-flags-preview-",
  "pixel-flags-registry-",
  "pixel-flags-smoke-",
  "pixel-flags-build-",
  "pixel-flags-coverage-",
  "pixel-flags-package-",
  "pixel-flags-site-",
  "pixel-flags-asset-validation-",
  "pixel-flags-apng-validation-",
];
export const README_PATH = DEFAULT_BUILD_CONTEXT.output.readmePath;
export const CSS_PATH = DEFAULT_BUILD_CONTEXT.output.cssPath;
export const MIN_CSS_PATH = DEFAULT_BUILD_CONTEXT.output.minCssPath;
export const HTML_PATH = DEFAULT_BUILD_CONTEXT.output.htmlPath;
export const ROBOTS_PATH = DEFAULT_BUILD_CONTEXT.output.robotsPath;
export const SITEMAP_PATH = DEFAULT_BUILD_CONTEXT.output.sitemapPath;
export const FAVICON_PATH = DEFAULT_BUILD_CONTEXT.output.faviconPath;
export const SOCIAL_CARD_PNG_PATH = DEFAULT_BUILD_CONTEXT.output.socialCardPngPath;
export const MANIFEST_PATH = DEFAULT_BUILD_CONTEXT.output.manifestPath;
export const ASSET_PROVENANCE_PATH = DEFAULT_BUILD_CONTEXT.output.assetProvenancePath;
export const COVERAGE_PATH = DEFAULT_BUILD_CONTEXT.output.coveragePath;
export const COVERAGE_BADGE_PATH = DEFAULT_BUILD_CONTEXT.output.coverageBadgePath;
export const REPO_URL = DEFAULT_BUILD_CONTEXT.repoUrl;
export const SITE_URL = DEFAULT_BUILD_CONTEXT.siteUrl;
export const SITE_PATHNAME = DEFAULT_BUILD_CONTEXT.sitePathname;
export const SITE_HOST_PATH = DEFAULT_BUILD_CONTEXT.siteHostPath;
export const REPO_BLOB_MAIN_URL = DEFAULT_BUILD_CONTEXT.repoBlobMainUrl;
export const ISSUES_URL = DEFAULT_BUILD_CONTEXT.issuesUrl;
export const PACKAGE_VERSION = DEFAULT_BUILD_CONTEXT.packageVersion;
