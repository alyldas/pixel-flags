import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import sharp from "sharp";

import { HEIGHT, WIDTH } from "../scripts/flag-art/constants.js";
import { flags } from "../scripts/flag-art/flags/index.js";
import { Painter } from "../scripts/flag-art/painter.js";
import { writePreview } from "../scripts/flag-art/preview.js";
import {
  assertSameRgbaPixels,
  readPngRgbaData,
  rgbaImageFromPainter,
} from "../scripts/lib/asset-validation.js";
import { FAVICON_PATH, SOCIAL_CARD_PNG_PATH } from "../scripts/lib/config.js";
import { buildProject } from "../scripts/lib/build.js";

test("generated favicon keeps the expected pixel flag motif", async () => {
  await buildProject();

  const { data, info } = await sharp(FAVICON_PATH).raw().toBuffer({ resolveWithObject: true });

  assert.equal(info.width, 64);
  assert.equal(info.height, 64);
  assertDarkBlue(getPixel(data, info, 4, 4), "favicon background");

  assertLight(getPixel(data, info, 32, 14), "favicon white stripe");
  assertBlue(getPixel(data, info, 32, 20), "favicon blue stripe");
  assertRed(getPixel(data, info, 32, 25), "favicon red stripe");
  assertGold(getPixel(data, info, 32, 35), "favicon lower panel");
});

test("generated social card keeps the Russian flag preview visible", async () => {
  await buildProject();

  const { data, info } = await sharp(SOCIAL_CARD_PNG_PATH)
    .raw()
    .toBuffer({ resolveWithObject: true });

  assert.equal(info.width, 1200);
  assert.equal(info.height, 630);

  assertLight(getPixel(data, info, 930, 408), "social card top stripe");
  assertBlue(getPixel(data, info, 930, 445), "social card middle stripe");
  assertRed(getPixel(data, info, 930, 482), "social card bottom stripe");
});

test("generated preview sheet keeps labels, scale, and flag pixels stable", async () => {
  const workspace = fs.mkdtempSync(path.join(os.tmpdir(), "pixel-flags-preview-"));
  const flagDir = path.join(workspace, "flags");
  const previewPath = path.join(workspace, "preview.png");

  fs.mkdirSync(flagDir, { recursive: true });

  const entries = [];
  for (const code of ["ru", "us"]) {
    const painter = new Painter();
    flags[code](painter);
    const outputPath = path.join(flagDir, `${code}.png`);
    await painter.write(outputPath);
    entries.push({ code, outputPath });
  }

  await writePreview(entries, previewPath);

  const { data, info } = await sharp(previewPath).raw().toBuffer({ resolveWithObject: true });

  assert.equal(info.width, 8 * WIDTH * 6 + 9 * 8);
  assert.equal(info.height, HEIGHT * 6 + 14 + 2 * 8);
  assertLight(getPixel(data, info, 172, 12), "preview label background");
  assertLight(getPixel(data, info, 24, 28), "preview Russian top stripe");
  assertBlue(getPixel(data, info, 24, 64), "preview Russian middle stripe");
  assertRed(getPixel(data, info, 24, 100), "preview Russian bottom stripe");
});

test("asset validation compares pixels instead of PNG encoder bytes", async () => {
  const workspace = fs.mkdtempSync(path.join(os.tmpdir(), "pixel-flags-asset-validation-"));
  const outputPath = path.join(workspace, "ru.png");
  const painter = new Painter();
  flags.ru(painter);

  try {
    await sharp(painter.data, {
      raw: {
        width: WIDTH,
        height: HEIGHT,
        channels: 4,
      },
    })
      .png({ compressionLevel: 0, palette: false })
      .toFile(outputPath);

    const decoded = await readPngRgbaData(outputPath);
    const expected = rgbaImageFromPainter(painter, WIDTH, HEIGHT);

    assert.notDeepEqual(fs.readFileSync(outputPath), await painter.pngBuffer());
    assert.doesNotThrow(() =>
      assertSameRgbaPixels("ru.png", decoded, expected, "scripts/flag-art/flags")
    );

    const changed = {
      data: Uint8ClampedArray.from(expected.data),
      info: expected.info,
    };
    changed.data[0] = changed.data[0] === 0 ? 1 : changed.data[0] - 1;

    assert.throws(
      () => assertSameRgbaPixels("ru.png", decoded, changed, "scripts/flag-art/flags"),
      /ru\.png is out of sync with scripts\/flag-art\/flags at pixel \(0, 0\), channel 0/
    );
  } finally {
    fs.rmSync(workspace, { recursive: true, force: true });
  }
});

function getPixel(data, info, x, y) {
  const offset = (y * info.width + x) * info.channels;

  return {
    r: data[offset],
    g: data[offset + 1],
    b: data[offset + 2],
  };
}

function assertLight(pixel, label) {
  assert.ok(pixel.r > 220 && pixel.g > 220 && pixel.b > 210, `${label}: ${formatPixel(pixel)}`);
}

function assertBlue(pixel, label) {
  assert.ok(
    pixel.b > 150 && pixel.b > pixel.r + 30 && pixel.b > pixel.g + 10,
    `${label}: ${formatPixel(pixel)}`
  );
}

function assertDarkBlue(pixel, label) {
  assert.ok(
    pixel.r < 40 && pixel.g < 50 && pixel.b > 45 && pixel.b < 80,
    `${label}: ${formatPixel(pixel)}`
  );
}

function assertRed(pixel, label) {
  assert.ok(
    pixel.r > 170 && pixel.r > pixel.g + 35 && pixel.r > pixel.b + 35,
    `${label}: ${formatPixel(pixel)}`
  );
}

function assertGold(pixel, label) {
  assert.ok(pixel.r > 220 && pixel.g > 150 && pixel.b < 130, `${label}: ${formatPixel(pixel)}`);
}

function formatPixel(pixel) {
  return `rgb(${pixel.r}, ${pixel.g}, ${pixel.b})`;
}
