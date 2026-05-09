import fs from "node:fs";
import path from "node:path";

import { HEIGHT, WIDTH } from "./flag-art/constants.js";
import { flags } from "./flag-art/flags.js";
import { Painter } from "./flag-art/painter.js";
import { writePreview } from "./flag-art/preview.js";

const args = new Set(process.argv.slice(2));
const draftMode = args.has("--draft");
const writePreviewSheet = draftMode || args.has("--preview");
const OUT_DIR = draftMode ? path.join("draft", "flags-32x18") : "flags";
const PREVIEW_PATH = path.join("draft", "flags-32x18-preview.png");

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const rendered = [];

  for (const [code, draw] of Object.entries(flags).sort(([left], [right]) =>
    left.localeCompare(right)
  )) {
    const painter = new Painter();
    draw(painter);
    const outputPath = path.join(OUT_DIR, code + ".png");
    await painter.write(outputPath);
    rendered.push({ code, outputPath, colors: painter.countColors() });
  }

  if (writePreviewSheet) {
    fs.mkdirSync(path.dirname(PREVIEW_PATH), { recursive: true });
    await writePreview(rendered, PREVIEW_PATH);
  }

  const maxColors = Math.max(...rendered.map((entry) => entry.colors));
  console.log("Drew " + rendered.length + " native " + WIDTH + "x" + HEIGHT + " pixel flags.");
  console.log("Max colors in a flag: " + maxColors + ".");
  console.log("Output: " + OUT_DIR);
  if (writePreviewSheet) {
    console.log("Preview: " + PREVIEW_PATH);
  }
}

await main();
