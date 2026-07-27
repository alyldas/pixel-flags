import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { HEIGHT as FLAG_HEIGHT, WIDTH as FLAG_WIDTH } from "../flag-art/constants.js";

export const PROJECT_ROOT = path.resolve(fileURLToPath(new URL("../..", import.meta.url)));
export const FLAG_RATIO = { width: FLAG_WIDTH, height: FLAG_HEIGHT };
export const README_COVERAGE_START = "<!-- coverage:start -->";
export const README_COVERAGE_END = "<!-- coverage:end -->";

/**
 * @typedef {{url?: string}} UrlObject
 * @typedef {{
 *   homepage?: string;
 *   repository?: string | UrlObject;
 *   bugs?: string | UrlObject;
 *   version: string;
 * }} PackageManifest
 * @typedef {{sourceRoot?: string; outputRoot?: string}} BuildContextOptions
 */

/**
 * @param {BuildContextOptions} [options]
 */
export function createBuildContext({ sourceRoot = PROJECT_ROOT, outputRoot = sourceRoot } = {}) {
  const resolvedSourceRoot = path.resolve(sourceRoot);
  const resolvedOutputRoot = path.resolve(outputRoot);
  const source = createProjectPaths(resolvedSourceRoot);
  const output = createProjectPaths(resolvedOutputRoot);
  const packageJson = /** @type {PackageManifest} */ (
    JSON.parse(fs.readFileSync(source.packageJsonPath, "utf8"))
  );
  const repoUrl = getRepositoryUrl(packageJson);
  const siteUrl = getSiteUrl(packageJson.homepage, repoUrl);
  const sitePathname = getSitePathname(siteUrl);

  return {
    sourceRoot: resolvedSourceRoot,
    outputRoot: resolvedOutputRoot,
    source,
    output,
    packageJson,
    packageVersion: packageJson.version,
    repoUrl,
    repoBlobMainUrl: `${repoUrl}/blob/main`,
    issuesUrl: getIssuesUrl(packageJson.bugs, repoUrl),
    siteUrl,
    sitePathname,
    siteHostPath: `${new URL(siteUrl).host}${sitePathname}`.replace(/\/$/, ""),
    flagRatio: FLAG_RATIO,
  };
}

export const DEFAULT_BUILD_CONTEXT = createBuildContext();

function createProjectPaths(rootDir) {
  const flagRecipeDir = path.join(rootDir, "scripts/flag-art/flags");
  const cssDir = path.join(rootDir, "css");
  const siteDir = path.join(rootDir, "site");
  const reportsDir = path.join(rootDir, "reports");
  const badgesDir = path.join(rootDir, "badges");
  const siteSourceDir = path.join(rootDir, "site-src");

  return {
    rootDir,
    packageJsonPath: path.join(rootDir, "package.json"),
    readmePath: path.join(rootDir, "README.md"),
    flagsDir: path.join(rootDir, "flags"),
    flagRecipeDir,
    flagIndexPath: path.join(flagRecipeDir, "index.js"),
    cssDir,
    cssPath: path.join(cssDir, "pixel-flags.css"),
    minCssPath: path.join(cssDir, "pixel-flags.min.css"),
    siteDir,
    htmlPath: path.join(siteDir, "index.html"),
    robotsPath: path.join(siteDir, "robots.txt"),
    sitemapPath: path.join(siteDir, "sitemap.xml"),
    faviconPath: path.join(siteDir, "favicon.svg"),
    socialCardPngPath: path.join(siteDir, "social-card.png"),
    manifestPath: path.join(siteDir, "site.webmanifest"),
    siteSourceDir,
    siteClientSourcePath: path.join(siteSourceDir, "app.js"),
    siteStyleSourcePath: path.join(siteSourceDir, "styles.css"),
    siteTemplatePath: path.join(siteSourceDir, "template.html"),
    reportsDir,
    coveragePath: path.join(reportsDir, "coverage.md"),
    badgesDir,
    coverageBadgePath: path.join(badgesDir, "coverage.svg"),
    pagesDir: path.join(rootDir, "_site"),
    draftDir: path.join(rootDir, "draft"),
    npmCacheDir: path.join(rootDir, ".npm-cache"),
    assetProvenancePath: path.join(rootDir, "flags/provenance.json"),
  };
}

function getRepositoryUrl(manifest) {
  const repository = manifest.repository;
  const rawValue =
    typeof repository === "string"
      ? repository
      : typeof repository?.url === "string"
        ? repository.url
        : undefined;
  const normalized = normalizeRepositoryUrl(rawValue);

  if (!normalized) {
    throw new Error(
      "Could not determine repository URL from package.json (expected repository.url or repository string)."
    );
  }

  return normalized;
}

function normalizeRepositoryUrl(value) {
  if (typeof value !== "string" || value.length === 0) {
    return undefined;
  }

  let normalized = value
    .trim()
    .replace(/^git\+/, "")
    .replace(/\.git$/, "");

  if (normalized.startsWith("git@github.com:")) {
    normalized = normalized.replace(/^git@github\.com:/, "https://github.com/");
  } else if (normalized.startsWith("github:")) {
    normalized = `https://github.com/${normalized.slice("github:".length)}`;
  }

  try {
    const parsed = new URL(normalized);
    const pathParts = parsed.pathname.split("/").filter(Boolean);

    if (parsed.hostname === "github.com" && pathParts.length >= 2) {
      return `https://github.com/${pathParts[0]}/${pathParts[1]}`;
    }

    return `${parsed.origin}${parsed.pathname.replace(/\/$/, "")}`;
  } catch {
    return undefined;
  }
}

function getIssuesUrl(bugs, repositoryUrl) {
  if (typeof bugs === "string" && bugs.length > 0) {
    return bugs;
  }

  if (typeof bugs?.url === "string" && bugs.url.length > 0) {
    return bugs.url;
  }

  return `${repositoryUrl}/issues`;
}

function getSiteUrl(homepage, repositoryUrl) {
  if (typeof homepage === "string" && homepage.length > 0) {
    const normalized = ensureTrailingSlash(homepage);
    try {
      return new URL(normalized).toString();
    } catch {
      throw new Error(`Invalid homepage URL in package.json: ${homepage}`);
    }
  }

  const repoUrl = new URL(repositoryUrl);
  const pathParts = repoUrl.pathname.split("/").filter(Boolean);
  if (repoUrl.hostname === "github.com" && pathParts.length >= 2) {
    return `https://${pathParts[0]}.github.io/${pathParts[1]}/`;
  }

  throw new Error("Could not infer SITE_URL. Set package.json homepage.");
}

function getSitePathname(siteUrl) {
  const pathname = new URL(siteUrl).pathname;
  return ensureTrailingSlash(pathname.startsWith("/") ? pathname : `/${pathname}`);
}

function ensureTrailingSlash(value) {
  return value.endsWith("/") ? value : `${value}/`;
}
