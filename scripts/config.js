import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const PROJECT_ROOT = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
export const PACKAGE_JSON_PATH = path.join(PROJECT_ROOT, "package.json");
/**
 * @typedef {{url?: string}} UrlObject
 * @typedef {{
 *   homepage?: string;
 *   repository?: string | UrlObject;
 *   bugs?: string | UrlObject;
 *   version: string;
 * }} PackageManifest
 */
const packageJson = /** @type {PackageManifest} */ (
  JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, "utf8"))
);
export const FLAGS_DIR = path.join(PROJECT_ROOT, "flags");
export const CSS_DIR = path.join(PROJECT_ROOT, "css");
export const SITE_DIR = path.join(PROJECT_ROOT, "site");
export const REPORTS_DIR = path.join(PROJECT_ROOT, "reports");
export const BADGES_DIR = path.join(PROJECT_ROOT, "badges");
export const README_PATH = path.join(PROJECT_ROOT, "README.md");
export const CSS_PATH = path.join(CSS_DIR, "pixel-flags.css");
export const MIN_CSS_PATH = path.join(CSS_DIR, "pixel-flags.min.css");
export const HTML_PATH = path.join(SITE_DIR, "index.html");
export const ROBOTS_PATH = path.join(SITE_DIR, "robots.txt");
export const SITEMAP_PATH = path.join(SITE_DIR, "sitemap.xml");
export const FAVICON_PATH = path.join(SITE_DIR, "favicon.svg");
export const SOCIAL_CARD_SVG_PATH = path.join(SITE_DIR, "social-card.svg");
export const SOCIAL_CARD_PNG_PATH = path.join(SITE_DIR, "social-card.png");
export const MANIFEST_PATH = path.join(SITE_DIR, "site.webmanifest");
export const ASSET_PROVENANCE_PATH = path.join(FLAGS_DIR, "provenance.json");
export const COVERAGE_PATH = path.join(REPORTS_DIR, "coverage.md");
export const COVERAGE_BADGE_PATH = path.join(BADGES_DIR, "coverage.svg");
export const ROOT_LEGACY_ARTIFACT_PATHS = [
  "pixel-flags.css",
  "pixel-flags.min.css",
  "index.html",
  "robots.txt",
  "sitemap.xml",
  "favicon.svg",
  "social-card.svg",
  "social-card.png",
  "site.webmanifest",
].map((fileName) => path.join(PROJECT_ROOT, fileName));
export const FLAG_RATIO = { width: 32, height: 18 };
export const REPO_URL = getRepositoryUrl(packageJson);
export const SITE_URL = getSiteUrl(packageJson.homepage, REPO_URL);
export const SITE_PATHNAME = getSitePathname(SITE_URL);
export const SITE_HOST_PATH = `${new URL(SITE_URL).host}${SITE_PATHNAME}`.replace(/\/$/, "");
export const REPO_BLOB_MAIN_URL = `${REPO_URL}/blob/main`;
export const ISSUES_URL = getIssuesUrl(packageJson.bugs, REPO_URL);
export const PACKAGE_VERSION = packageJson.version;
export const README_COVERAGE_START = "<!-- coverage:start -->";
export const README_COVERAGE_END = "<!-- coverage:end -->";

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
