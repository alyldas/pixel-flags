import assert from "node:assert/strict";
import test from "node:test";

import sharp from "sharp";

import { SOCIAL_CARD_PNG_PATH } from "../scripts/lib/config.js";
import { buildProject } from "../scripts/lib/build.js";

test("generated social card uses the Russian flag as the representative flag", async () => {
  await buildProject();

  const { data, info } = await sharp(SOCIAL_CARD_PNG_PATH)
    .raw()
    .toBuffer({ resolveWithObject: true });

  assert.equal(info.width, 1200);
  assert.equal(info.height, 630);

  const top = getPixel(data, info, 930, 408);
  const middle = getPixel(data, info, 930, 445);
  const bottom = getPixel(data, info, 930, 482);

  assert.ok(top.r > 220 && top.g > 220 && top.b > 210, `Unexpected top stripe: ${top}`);
  assert.ok(
    middle.b > 180 && middle.b > middle.r + 40 && middle.b > middle.g + 20,
    `Unexpected middle stripe: ${middle}`
  );
  assert.ok(
    bottom.r > 180 && bottom.r > bottom.g + 40 && bottom.r > bottom.b + 40,
    `Unexpected bottom stripe: ${bottom}`
  );
});

function getPixel(data, info, x, y) {
  const offset = (y * info.width + x) * info.channels;

  return {
    r: data[offset],
    g: data[offset + 1],
    b: data[offset + 2],
    toString() {
      return `rgb(${this.r}, ${this.g}, ${this.b})`;
    },
  };
}
