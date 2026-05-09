import sharp from "sharp";

import { HEIGHT, WIDTH } from "./constants.js";

const PREVIEW_SCALE = 6;

export async function writePreview(entries, previewPath) {
  const labelHeight = 14;
  const columns = 8;
  const gap = 8;
  const cellWidth = WIDTH * PREVIEW_SCALE;
  const cellHeight = HEIGHT * PREVIEW_SCALE + labelHeight;
  const rows = Math.ceil(entries.length / columns);
  const sheet = sharp({
    create: {
      width: columns * cellWidth + (columns + 1) * gap,
      height: rows * cellHeight + (rows + 1) * gap,
      channels: 4,
      background: "#d8dee8",
    },
  });
  const composites = [];

  for (let index = 0; index < entries.length; index += 1) {
    const entry = entries[index];
    const x = gap + (index % columns) * (cellWidth + gap);
    const y = gap + Math.floor(index / columns) * (cellHeight + gap);
    const image = await sharp(entry.outputPath)
      .resize(cellWidth, HEIGHT * PREVIEW_SCALE, { kernel: "nearest" })
      .png()
      .toBuffer();
    const label = Buffer.from(
      `<svg width="${cellWidth}" height="${labelHeight}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#ffffff"/><text x="4" y="11" font-size="10" font-family="Arial" fill="#111">${entry.code.toUpperCase()}</text></svg>`
    );
    const frame = Buffer.from(
      `<svg width="${cellWidth}" height="${cellHeight}" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="0.5" width="${cellWidth - 1}" height="${cellHeight - 1}" fill="#ffffff" stroke="#9aa4b2"/></svg>`
    );

    composites.push({ input: frame, left: x, top: y });
    composites.push({ input: label, left: x, top: y });
    composites.push({ input: image, left: x, top: y + labelHeight });
  }

  await sheet.composite(composites).png().toFile(previewPath);
}
