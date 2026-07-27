import fs from "node:fs";

import { buildStructuredData } from "./site-assets.js";
import { escapeHtml, formatPercent } from "./utils.js";

const SITE_TITLE = "Pixel Flags | CSS Pixel-Art Country Flags";
const SITE_DESCRIPTION =
  "Native 32x18 pixel-art country flags with a flag-icons-like CSS API and generated ISO coverage tracking.";

export function readSiteSource(sourcePath) {
  return `${fs.readFileSync(sourcePath, "utf8").trimEnd()}\n`;
}

export function buildSiteHtml(context, entries, coverage) {
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
