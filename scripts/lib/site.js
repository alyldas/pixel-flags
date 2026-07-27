import fs from "node:fs";
import path from "node:path";

import { DEFAULT_BUILD_CONTEXT } from "./config.js";
import { ensureDir, writeText, escapeHtml, escapeXml, formatPercent } from "./utils.js";

const SITE_TITLE = "Pixel Flags | CSS Pixel-Art Country Flags";
const SITE_DESCRIPTION =
  "Native 32x18 pixel-art country flags with a flag-icons-like CSS API and generated ISO coverage tracking.";

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

function readSiteSource(sourcePath) {
  return `${fs.readFileSync(sourcePath, "utf8").trimEnd()}\n`;
}

function buildSiteHtml(context, entries, coverage) {
  const template = fs.readFileSync(context.source.siteTemplatePath, "utf8");

  return renderTemplate(template, {
    DESCRIPTION: escapeHtml(SITE_DESCRIPTION),
    FLAGS: buildFlagCards(entries),
    FLAG_COUNT: String(entries.length),
    ISO_COVERAGE: formatPercent(coverage.coverage),
    MISSING_COUNT: String(coverage.missing.length),
    PIXEL_RATIO: `${context.flagRatio.width}:${context.flagRatio.height}`,
    SITE_TITLE: escapeHtml(SITE_TITLE),
    SITE_URL: escapeHtml(context.siteUrl),
    SOCIAL_IMAGE: escapeHtml(`${context.siteUrl}social-card.png`),
    STRUCTURED_DATA: buildStructuredData(context, coverage),
  });
}

function buildFlagCards(entries) {
  return entries
    .map((entry) => {
      const code = escapeHtml(entry.code);
      const name = escapeHtml(entry.name);
      const slug = escapeHtml(entry.slug);
      const className = `pf pf-${slug}`;

      return `<article class="flag-card" data-flag-card data-code="${slug}" data-name="${escapeHtml(
        entry.name.toLowerCase()
      )}">
  <div class="flag-card__flag">
    <span class="${className}" aria-hidden="true"></span>
  </div>
  <div class="flag-card__body">
    <strong>${code}</strong>
    <span>${name}</span>
  </div>
  <code>${className}</code>
</article>`;
    })
    .join("\n");
}

function renderTemplate(template, replacements) {
  let html = template;

  for (const [token, value] of Object.entries(replacements)) {
    html = html.replaceAll(`%%${token}%%`, value);
  }

  const unresolvedTokens = html.match(/%%[A-Z_]+%%/g);

  if (unresolvedTokens) {
    throw new Error(`Unresolved site template tokens: ${unresolvedTokens.join(", ")}`);
  }

  return html;
}

function buildStructuredData(context, coverage) {
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "SoftwareSourceCode",
      name: "Pixel Flags",
      description: "Native 32x18 pixel-art country flags with a flag-icons-like CSS API.",
      url: context.siteUrl,
      codeRepository: context.repoUrl,
      issueTracker: context.issuesUrl,
      license: `${context.repoBlobMainUrl}/LICENSE`,
      programmingLanguage: ["CSS", "HTML", "JavaScript"],
      runtimePlatform: "Browser",
      keywords: ["css flags", "pixel flags", "country flags", "flag icons"],
      softwareVersion: context.packageVersion,
      releaseNotes: `${coverage.have}/${coverage.isoTotal} ISO codes currently available.`,
    },
    null,
    2
  );
}

function buildFavicon() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="Pixel Flags">
  <rect width="64" height="64" rx="14" fill="#14213d"/>
  <rect x="10" y="12" width="44" height="16" rx="3" fill="#f6f3e8"/>
  <rect x="10" y="17.33" width="44" height="5.34" fill="#4f7cff"/>
  <rect x="10" y="22.67" width="44" height="5.33" fill="#f66b4f"/>
  <rect x="10" y="34" width="44" height="18" rx="3" fill="#ffcc66"/>
  <path d="M18 46V38h8.4c4.9 0 7.8 1.6 7.8 5.7S31.3 50 26.4 50H22v4h-4zm4-3h4.1c2.7 0 4-.4 4-2.2 0-1.7-1.3-2.1-4-2.1H22v4.3zm14 7V38h7.8c5.8 0 9.2 1.7 9.2 6.1 0 4.6-3.4 6.4-9.2 6.4H36zm4-3.4h3.3c3.6 0 5.7-.7 5.7-3.8 0-3-2.1-3.5-5.7-3.5H40v7.3z" fill="#14213d"/>
</svg>
`;
}

function buildSocialCardSvg(context, report) {
  const coverage = formatPercent(report.coverage);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="${escapeXml(`Pixel Flags ${coverage} ISO coverage`)}}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fbf7ef"/>
      <stop offset="100%" stop-color="#efe5d4"/>
    </linearGradient>
    <radialGradient id="sun" cx="0.18" cy="0.2" r="0.7">
      <stop offset="0%" stop-color="#ffcc66" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#ffcc66" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#sun)"/>
  <rect x="70" y="70" width="1060" height="490" rx="36" fill="rgba(255,255,255,0.74)" stroke="rgba(20,33,61,0.12)"/>
  <text x="110" y="185" fill="#14213d" font-family="DejaVu Sans, Liberation Sans, Arial, Helvetica, sans-serif" font-size="112" font-weight="800">Pixel Flags</text>
  <text x="110" y="250" fill="#506174" font-family="DejaVu Sans, Liberation Sans, Arial, Helvetica, sans-serif" font-size="30">CSS pixel-art country flags with a flag-icons-like API</text>
  <g transform="translate(110 315)">
    <rect width="180" height="72" rx="22" fill="#14213d"/>
    <text x="90" y="36" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-family="DejaVu Sans, Liberation Sans, Arial, Helvetica, sans-serif" font-size="34" font-weight="700">${escapeXml(coverage)}</text>
  </g>
  <text x="110" y="445" fill="#14213d" font-family="DejaVu Sans, Liberation Sans, Arial, Helvetica, sans-serif" font-size="28">Available flags: ${report.have}</text>
  <text x="110" y="490" fill="#14213d" font-family="DejaVu Sans, Liberation Sans, Arial, Helvetica, sans-serif" font-size="28">Missing ISO codes: ${report.missing.length}</text>
  <text x="110" y="535" fill="#506174" font-family="DejaVu Sans, Liberation Sans, Arial, Helvetica, sans-serif" font-size="24">${escapeXml(context.siteHostPath)}</text>
  <g transform="translate(814 366)">
    <rect x="0" y="0" width="280" height="158" rx="18" fill="#ffffff" stroke="#d5d9e2"/>
    <rect x="24" y="24" width="232" height="110" rx="12" fill="#f6f3e8"/>
    <rect x="24" y="60.67" width="232" height="36.66" fill="#4f7cff"/>
    <rect x="24" y="97.33" width="232" height="36.67" fill="#f66b4f"/>
  </g>
</svg>
`;
}

function buildRobotsTxt(context) {
  return `User-agent: *
Allow: /

Sitemap: ${context.siteUrl}sitemap.xml
`;
}

function buildSitemap(context) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${context.siteUrl}</loc>
  </url>
</urlset>
`;
}

function buildWebManifest(context) {
  return `${JSON.stringify(
    {
      name: "Pixel Flags",
      short_name: "Pixel Flags",
      start_url: context.sitePathname,
      scope: context.sitePathname,
      display: "standalone",
      background_color: "#f4efe4",
      theme_color: "#14213d",
      icons: [
        {
          src: `${context.siteUrl}favicon.svg`,
          sizes: "any",
          type: "image/svg+xml",
        },
      ],
    },
    null,
    2
  )}\n`;
}
