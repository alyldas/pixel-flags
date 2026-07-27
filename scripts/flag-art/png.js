import sharp from "sharp";

import { HEIGHT, WIDTH } from "./constants.js";

export function createPngPipeline(data) {
  return sharp(data, {
    raw: {
      width: WIDTH,
      height: HEIGHT,
      channels: 4,
    },
  }).png({
    compressionLevel: 9,
    palette: true,
  });
}

export async function writePng(data, outputPath) {
  await createPngPipeline(data).toFile(outputPath);
}

export function encodePng(data) {
  return createPngPipeline(data).toBuffer();
}
