import path from "node:path";

import {
  FAVICON_PATH,
  FLAG_RATIO,
  HTML_PATH,
  ISSUES_URL,
  MANIFEST_PATH,
  PACKAGE_VERSION,
  PROJECT_ROOT,
  REPO_BLOB_MAIN_URL,
  REPO_URL,
  ROBOTS_PATH,
  SITE_DIR,
  SITE_HOST_PATH,
  SITE_PATHNAME,
  SITE_URL,
  SITEMAP_PATH,
  SOCIAL_CARD_PNG_PATH,
  SOCIAL_CARD_SVG_PATH,
} from "./config.js";
import { ensureDir, escapeHtml, escapeXml, formatPercent, writeText } from "./utils.js";

function buildStructuredData(coverage) {
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "SoftwareSourceCode",
      name: "Pixel Flags",
      description: "Pixel-art country flags with a flag-icons-like CSS API and static demo site.",
      url: SITE_URL,
      codeRepository: REPO_URL,
      issueTracker: ISSUES_URL,
      license: `${REPO_BLOB_MAIN_URL}/NOTICE.md`,
      programmingLanguage: ["CSS", "HTML", "JavaScript"],
      runtimePlatform: "Browser",
      keywords: ["css flags", "pixel flags", "country flags", "flag icons"],
      softwareVersion: PACKAGE_VERSION,
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

function buildSocialCardSvg(report) {
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
  <text x="110" y="535" fill="#506174" font-family="DejaVu Sans, Liberation Sans, Arial, Helvetica, sans-serif" font-size="24">${escapeXml(SITE_HOST_PATH)}</text>
  <g transform="translate(814 366)">
    <rect x="0" y="0" width="280" height="158" rx="18" fill="#ffffff" stroke="#d5d9e2"/>
    <rect x="24" y="24" width="232" height="110" rx="12" fill="#f6f3e8"/>
    <rect x="24" y="60.67" width="232" height="36.66" fill="#4f7cff"/>
    <rect x="24" y="97.33" width="232" height="36.67" fill="#f66b4f"/>
  </g>
</svg>
`;
}

function buildRobotsTxt() {
  return `User-agent: *
Allow: /

Sitemap: ${SITE_URL}sitemap.xml
`;
}

function buildSitemap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}</loc>
  </url>
</urlset>
`;
}

function buildWebManifest() {
  return `${JSON.stringify(
    {
      name: "Pixel Flags",
      short_name: "Pixel Flags",
      start_url: SITE_PATHNAME,
      scope: SITE_PATHNAME,
      display: "standalone",
      background_color: "#f4efe4",
      theme_color: "#14213d",
      icons: [
        {
          src: `${SITE_URL}favicon.svg`,
          sizes: "any",
          type: "image/svg+xml",
        },
      ],
    },
    null,
    2
  )}\n`;
}

function buildSiteHtml(entries, coverage) {
  const cards = entries
    .map((entry, index) => {
      const code = escapeHtml(entry.code);
      const name = escapeHtml(entry.name);
      const className = `pf pf-${entry.slug}`;

      return [
        `<article class="flag-card" data-flag-card data-code="${escapeHtml(entry.slug)}" data-name="${escapeHtml(entry.name.toLowerCase())}" style="--index:${index};">`,
        '  <div class="flag-card__mast">',
        `    <span class="${className}" aria-hidden="true"></span>`,
        "  </div>",
        '  <div class="flag-card__meta">',
        '    <div class="flag-card__topline">',
        `      <strong>${code}</strong>`,
        `      <span>${name}</span>`,
        "    </div>",
        `    <code>${className}</code>`,
        "  </div>",
        "</article>",
      ].join("\n");
    })
    .join("\n");

  const description =
    "Pixel-art country flags with a flag-icons-like CSS API, GitHub Pages demo, and generated ISO coverage tracking.";
  const socialImage = `${SITE_URL}social-card.png`;
  const structuredData = buildStructuredData(coverage);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Pixel Flags | CSS Pixel-Art Country Flags</title>
    <meta name="description" content="${escapeHtml(description)}">
    <meta name="robots" content="index,follow">
    <meta name="theme-color" content="#14213d">
    <link rel="canonical" href="${SITE_URL}">
    <link rel="icon" href="./favicon.svg" type="image/svg+xml">
    <link rel="manifest" href="./site.webmanifest">
    <meta property="og:type" content="website">
    <meta property="og:title" content="Pixel Flags | CSS Pixel-Art Country Flags">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:url" content="${SITE_URL}">
    <meta property="og:site_name" content="Pixel Flags">
    <meta property="og:image" content="${socialImage}">
    <meta property="og:image:type" content="image/png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Pixel Flags | CSS Pixel-Art Country Flags">
    <meta name="twitter:description" content="${escapeHtml(description)}">
    <meta name="twitter:image" content="${socialImage}">
    <script type="application/ld+json">${structuredData}</script>
    <link rel="stylesheet" href="./css/pixel-flags.css">
    <style>
      :root {
        --paper: #f4efe4;
        --ink: #14213d;
        --muted: #506174;
        --line: rgba(20, 33, 61, 0.12);
        --sun: #ffcc66;
        --coral: #f66b4f;
        --sea: #4f7cff;
        --leaf: #2a9d66;
        --card: rgba(255, 252, 246, 0.82);
        --shadow: 0 24px 60px rgba(20, 33, 61, 0.14);
      }

      * {
        box-sizing: border-box;
      }

      html {
        color-scheme: light;
      }

      body {
        margin: 0;
        min-height: 100vh;
        font-family: "Avenir Next Condensed", "Futura", "Trebuchet MS", sans-serif;
        color: var(--ink);
        background:
          radial-gradient(circle at top left, rgba(255, 204, 102, 0.38), transparent 28%),
          radial-gradient(circle at top right, rgba(79, 124, 255, 0.20), transparent 26%),
          linear-gradient(180deg, #fbf7ef 0%, #efe5d4 100%);
      }

      body::before {
        content: "";
        position: fixed;
        inset: 0;
        pointer-events: none;
        background-image:
          linear-gradient(rgba(20, 33, 61, 0.035) 1px, transparent 1px),
          linear-gradient(90deg, rgba(20, 33, 61, 0.035) 1px, transparent 1px);
        background-size: 28px 28px;
        mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.7), transparent 92%);
      }

      a {
        color: inherit;
      }

      code {
        font-family: "JetBrains Mono", "SFMono-Regular", "Menlo", monospace;
      }

      .shell {
        width: min(1200px, calc(100vw - 2rem));
        margin: 0 auto;
        padding: 2rem 0 4rem;
      }

      .hero {
        position: relative;
        overflow: hidden;
        border: 1px solid var(--line);
        border-radius: 32px;
        padding: 2rem;
        background:
          linear-gradient(140deg, rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.58)),
          linear-gradient(120deg, rgba(79, 124, 255, 0.16), rgba(246, 107, 79, 0.08));
        box-shadow: var(--shadow);
      }

      .hero::after {
        content: "";
        position: absolute;
        right: -5rem;
        top: -5rem;
        width: 18rem;
        height: 18rem;
        border-radius: 999px;
        background: radial-gradient(circle, rgba(255, 204, 102, 0.65), rgba(255, 204, 102, 0));
        filter: blur(10px);
      }

      .hero__eyebrow {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 1rem;
        padding: 0.35rem 0.7rem;
        border-radius: 999px;
        background: rgba(20, 33, 61, 0.08);
        font-size: 0.9rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .hero h1 {
        margin: 0;
        max-width: 12ch;
        font-size: clamp(3rem, 7vw, 6.5rem);
        line-height: 0.92;
        letter-spacing: -0.04em;
      }

      .hero p {
        max-width: 42rem;
        margin: 1rem 0 0;
        font-size: clamp(1.05rem, 2vw, 1.35rem);
        line-height: 1.45;
        color: var(--muted);
      }

      .hero__grid {
        display: grid;
        grid-template-columns: minmax(0, 1.4fr) minmax(20rem, 0.9fr);
        gap: 1.5rem;
        align-items: end;
      }

      .hero__code,
      .hero__stats,
      .panel {
        position: relative;
        border: 1px solid var(--line);
        border-radius: 24px;
        background: var(--card);
        backdrop-filter: blur(12px);
      }

      .hero__code {
        margin-top: 1.75rem;
        padding: 1rem 1.15rem;
      }

      .hero__code pre {
        margin: 0;
        overflow: auto;
        font-size: 0.98rem;
        line-height: 1.6;
      }

      .hero__stats {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 0.9rem;
        padding: 1rem;
        align-self: stretch;
      }

      .metric {
        padding: 1rem;
        border-radius: 18px;
        background: rgba(255, 255, 255, 0.72);
      }

      .metric span {
        display: block;
        color: var(--muted);
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 0.06em;
      }

      .metric strong {
        display: block;
        margin-top: 0.3rem;
        font-size: clamp(1.6rem, 3vw, 2.4rem);
      }

      .sample-row {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        margin-top: 1.4rem;
      }

      .badge {
        display: inline-flex;
        align-items: center;
        gap: 0.6rem;
        padding: 0.7rem 0.95rem;
        border-radius: 999px;
        border: 1px solid var(--line);
        background: rgba(255, 255, 255, 0.75);
      }

      .content {
        display: grid;
        gap: 1.5rem;
        margin-top: 1.5rem;
      }

      .panel {
        padding: 1.25rem;
        box-shadow: var(--shadow);
      }

      .panel__topline {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        align-items: center;
        margin-bottom: 1rem;
      }

      .panel__topline h2,
      .panel__topline p {
        margin: 0;
      }

      .panel__topline h2 {
        font-size: clamp(1.4rem, 3vw, 2rem);
        letter-spacing: -0.03em;
      }

      .panel__topline p {
        color: var(--muted);
      }

      .search {
        width: min(100%, 26rem);
        padding: 0.95rem 1rem;
        border: 1px solid rgba(20, 33, 61, 0.16);
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.88);
        font: inherit;
      }

      .flags-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
        gap: 1rem;
      }

      .flag-card {
        display: grid;
        gap: 0.9rem;
        padding: 1rem;
        border: 1px solid var(--line);
        border-radius: 22px;
        background:
          linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(255, 252, 246, 0.88));
        transform: translateY(14px);
        opacity: 0;
        animation: rise 360ms cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
        animation-delay: calc((var(--index) % 18) * 24ms);
      }

      .flag-card__mast {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 5rem;
        border-radius: 16px;
        background:
          linear-gradient(180deg, rgba(79, 124, 255, 0.1), rgba(255, 204, 102, 0.15));
      }

      .flag-card__mast .pf {
        --pf-height: 2.75rem;
        box-shadow: 0 14px 28px rgba(20, 33, 61, 0.12);
      }

      .flag-card__meta {
        display: grid;
        gap: 0.6rem;
      }

      .flag-card__topline {
        display: grid;
        gap: 0.25rem;
      }

      .flag-card__topline strong {
        font-size: 1.2rem;
        letter-spacing: 0.06em;
      }

      .flag-card__topline span {
        color: var(--muted);
      }

      .flag-card code {
        padding: 0.7rem 0.8rem;
        border-radius: 14px;
        background: rgba(20, 33, 61, 0.06);
        font-size: 0.92rem;
      }

      .legend {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 1rem;
      }

      .legend p {
        margin: 0;
        color: var(--muted);
        line-height: 1.55;
      }

      [hidden] {
        display: none !important;
      }

      @keyframes rise {
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }

      @media (max-width: 860px) {
        .hero__grid,
        .legend {
          grid-template-columns: 1fr;
        }

        .panel__topline {
          align-items: start;
          flex-direction: column;
        }

        .hero {
          padding: 1.4rem;
        }
      }
    </style>
  </head>
  <body>
    <main class="shell">
      <section class="hero">
        <div class="hero__eyebrow">
          <span>Pixel Flags</span>
          <span>CSS-first</span>
        </div>
        <div class="hero__grid">
          <div>
            <h1>Flags that stay sharp.</h1>
            <p>
              A compact CSS API inspired by
              <a href="https://github.com/lipis/flag-icons">flag-icons</a>,
              rebuilt around pixel-art PNGs from
              <a href="https://r74n.com/pixelflags/">R74n Pixel Flags</a>.
              Use a single base class plus an ISO2 modifier and scale everything with
              <code>font-size</code> or <code>--pf-height</code>.
            </p>
            <div class="sample-row">
              <span class="badge"><span class="pf pf-ru" aria-hidden="true"></span><code>pf pf-ru</code></span>
            </div>
            <div class="hero__code">
              <pre><code>&lt;link rel="stylesheet" href="./css/pixel-flags.css"&gt;
&lt;span class="pf pf-ru" role="img" aria-label="Russia"&gt;&lt;/span&gt;
&lt;span class="pf pf-ru" style="--pf-height: 2rem" aria-label="Russia"&gt;&lt;/span&gt;</code></pre>
            </div>
          </div>
          <aside class="hero__stats">
            <div class="metric">
              <span>Available flags</span>
              <strong>${coverage.have}</strong>
            </div>
            <div class="metric">
              <span>ISO coverage</span>
              <strong>${formatPercent(coverage.coverage)}</strong>
            </div>
            <div class="metric">
              <span>Missing ISO codes</span>
              <strong>${coverage.missing.length}</strong>
            </div>
            <div class="metric">
              <span>Pixel ratio</span>
              <strong>${FLAG_RATIO.width}:${FLAG_RATIO.height}</strong>
            </div>
          </aside>
        </div>
      </section>

      <section class="content">
        <section class="panel">
          <div class="panel__topline">
            <div>
              <h2>How it works</h2>
              <p>The API surface stays intentionally small: one base class, one ISO2 modifier.</p>
            </div>
          </div>
          <div class="legend">
            <p>
              Add <code>.pf</code> to create the inline flag box. Then add a country modifier
              like <code>.pf-ru</code>. The flags use
              <code>background-image</code>, so the HTML stays empty and portable.
            </p>
            <p>
              PNG assets live in <code>flags/</code>. The generated stylesheet keeps them on
              their native 32x18 ratio, preserves the blocky look with
              <code>image-rendering: pixelated</code>, and supports size overrides through
              <code>--pf-height</code>.
            </p>
          </div>
        </section>

        <section class="panel">
          <div class="panel__topline">
            <div>
              <h2>Browse the set</h2>
              <p><span data-visible-count>${entries.length}</span> flags visible</p>
            </div>
            <input
              class="search"
              type="search"
              placeholder="Search by code or country name"
              aria-label="Search flags"
              data-search
            >
          </div>
          <div class="flags-grid">
${cards}
          </div>
        </section>
      </section>
    </main>

    <script>
      const input = document.querySelector("[data-search]");
      const cards = Array.from(document.querySelectorAll("[data-flag-card]"));
      const counter = document.querySelector("[data-visible-count]");

      const applyFilter = () => {
        const query = input.value.trim().toLowerCase();
        let visible = 0;

        for (const card of cards) {
          const haystack = card.dataset.code + " " + card.dataset.name;
          const matches = haystack.includes(query);
          card.hidden = !matches;
          if (matches) visible += 1;
        }

        counter.textContent = String(visible);
      };

      input.addEventListener("input", applyFilter);
      applyFilter();
    </script>
  </body>
</html>
`;
}

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
