import sharp from "sharp";

export async function readPngRgbaData(filePath) {
  return sharp(filePath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
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
