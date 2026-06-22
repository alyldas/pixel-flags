import fs from "node:fs";

import sharp from "sharp";

const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const APNG_CHUNK_TYPES = new Set(["acTL", "fcTL", "fdAT"]);

export async function readPngRgbaData(filePath, fileName = filePath) {
  assertNoAnimatedPngChunks(fileName, fs.readFileSync(filePath));

  const metadata = await sharp(filePath, { animated: true }).metadata();
  assertStaticPngMetadata(fileName, metadata);

  return sharp(filePath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
}

export function assertStaticPngMetadata(fileName, metadata) {
  if (metadata.format !== "png") {
    throw new Error(`${fileName} is ${metadata.format || "an unknown format"}; expected png`);
  }

  if ((metadata.pages ?? 1) > 1 || (metadata.delay?.length ?? 0) > 1) {
    throw new Error(`${fileName} is an animated PNG; expected a static PNG`);
  }
}

export function assertNoAnimatedPngChunks(fileName, pngBuffer) {
  if (!pngBuffer.subarray(0, PNG_SIGNATURE.length).equals(PNG_SIGNATURE)) {
    throw new Error(`${fileName} is not a PNG file`);
  }

  let offset = PNG_SIGNATURE.length;
  while (offset < pngBuffer.length) {
    if (offset + 12 > pngBuffer.length) {
      throw new Error(`${fileName} has a truncated PNG chunk header`);
    }

    const length = pngBuffer.readUInt32BE(offset);
    const typeOffset = offset + 4;
    const dataOffset = typeOffset + 4;
    const nextOffset = dataOffset + length + 4;

    if (nextOffset > pngBuffer.length) {
      throw new Error(`${fileName} has a truncated PNG chunk`);
    }

    const chunkType = pngBuffer.toString("ascii", typeOffset, dataOffset);
    if (APNG_CHUNK_TYPES.has(chunkType)) {
      throw new Error(`${fileName} is an animated PNG; found ${chunkType} chunk`);
    }

    offset = nextOffset;

    if (chunkType === "IEND") {
      return;
    }
  }

  throw new Error(`${fileName} is missing the PNG IEND chunk`);
}

export function validateOpaquePalette(fileName, image, maxColors = 256) {
  const colors = new Set();

  for (let offset = 0; offset < image.data.length; offset += image.info.channels) {
    const alpha = image.data[offset + 3];

    if (alpha !== 255) {
      const pixel = formatPixelOffset(offset, image.info);
      throw new Error(`${fileName} has non-opaque alpha value at ${pixel}: ${alpha}`);
    }

    colors.add(`${image.data[offset]},${image.data[offset + 1]},${image.data[offset + 2]}`);
  }

  if (colors.size > maxColors) {
    throw new Error(`${fileName} has ${colors.size} colors; expected <= ${maxColors}`);
  }

  return colors.size;
}

export function assertSameRgbaPixels(fileName, actual, expected, sourceLabel) {
  if (actual.info.width !== expected.info.width || actual.info.height !== expected.info.height) {
    throw new Error(
      `${fileName} dimensions differ from ${sourceLabel}: ${actual.info.width}x${actual.info.height} != ${expected.info.width}x${expected.info.height}`
    );
  }

  const pixelCount = actual.info.width * actual.info.height;
  for (let pixelIndex = 0; pixelIndex < pixelCount; pixelIndex += 1) {
    const actualOffset = pixelIndex * actual.info.channels;
    const expectedOffset = pixelIndex * expected.info.channels;

    for (let channel = 0; channel < 4; channel += 1) {
      if (actual.data[actualOffset + channel] !== expected.data[expectedOffset + channel]) {
        const x = pixelIndex % actual.info.width;
        const y = Math.floor(pixelIndex / actual.info.width);
        throw new Error(
          `${fileName} is out of sync with ${sourceLabel} at pixel (${x}, ${y}), channel ${channel}: ${actual.data[actualOffset + channel]} != ${expected.data[expectedOffset + channel]}`
        );
      }
    }
  }
}

export function rgbaImageFromPainter(painter, width, height) {
  return {
    data: painter.data,
    info: {
      width,
      height,
      channels: 4,
    },
  };
}

function formatPixelOffset(offset, info) {
  const pixelIndex = offset / info.channels;
  const x = pixelIndex % info.width;
  const y = Math.floor(pixelIndex / info.width);

  return `pixel (${x}, ${y})`;
}
