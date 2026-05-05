import { FLAG_RATIO, SITE_URL } from "./config.js";
import { buildStructuredData } from "./site-metadata.js";
import { escapeHtml, formatPercent } from "./utils.js";

export function buildSiteHtml(entries, coverage) {
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
