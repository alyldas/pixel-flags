import sharp from "sharp";

import { HEIGHT, WIDTH } from "./constants.js";
import { C } from "./palette.js";
import { containsPoint, parseColor, splitEvenly } from "./geometry.js";

export class Painter {
  constructor() {
    this.data = new Uint8ClampedArray(WIDTH * HEIGHT * 4);
    this.bg(C.white);
  }

  bg(color) {
    return this.rect(0, 0, WIDTH, HEIGHT, color);
  }

  rect(x, y, width, height, color) {
    const rgba = parseColor(color);
    for (let yy = y; yy < y + height; yy += 1) {
      for (let xx = x; xx < x + width; xx += 1) {
        this.pixel(xx, yy, rgba);
      }
    }
    return this;
  }

  hstripes(colors) {
    const baseHeight = Math.floor(HEIGHT / colors.length);
    let y = 0;
    for (let index = 0; index < colors.length; index += 1) {
      const height = index === colors.length - 1 ? HEIGHT - y : baseHeight;
      this.rect(0, y, WIDTH, height, colors[index]);
      y += height;
    }
    return this;
  }

  vstripes(colors) {
    const widths = colors.length === 3 ? [11, 10, 11] : splitEvenly(WIDTH, colors.length);
    let x = 0;
    for (let index = 0; index < colors.length; index += 1) {
      this.rect(x, 0, widths[index], HEIGHT, colors[index]);
      x += widths[index];
    }
    return this;
  }

  cross(color, x, y, width, height) {
    this.rect(x, 0, width, HEIGHT, color);
    this.rect(0, y, WIDTH, height, color);
    return this;
  }

  miniSeal(cx, cy, color) {
    this.rect(Math.round(cx) - 1, Math.round(cy) - 3, 2, 6, color);
    this.rect(Math.round(cx) - 3, Math.round(cy) - 1, 6, 2, color);
    this.rect(Math.round(cx) - 2, Math.round(cy) + 2, 4, 1, color);
    return this;
  }

  gear(cx, cy, color) {
    this.disk(cx, cy, 3, color);
    this.rect(Math.round(cx) - 1, Math.round(cy) - 5, 2, 10, color);
    this.rect(Math.round(cx) - 5, Math.round(cy), 10, 1, color);
    return this;
  }

  eagle(cx, cy, color) {
    this.rect(Math.round(cx) - 5, Math.round(cy), 10, 2, color);
    this.rect(Math.round(cx) - 2, Math.round(cy) - 2, 4, 5, color);
    this.rect(Math.round(cx) - 7, Math.round(cy) + 1, 3, 1, color);
    this.rect(Math.round(cx) + 4, Math.round(cy) + 1, 3, 1, color);
    return this;
  }

  maple(cx, cy, color) {
    this.star(cx, cy - 1, 5, 2, color, -90);
    this.rect(Math.round(cx) - 1, Math.round(cy) + 2, 2, 5, color);
    this.rect(Math.round(cx) - 4, Math.round(cy) + 1, 8, 2, color);
    return this;
  }

  crescent(cx, cy, radius, color, cutoutColor) {
    this.disk(cx, cy, radius, color);
    this.disk(cx + radius * 0.42, cy - radius * 0.08, radius * 0.82, cutoutColor);
    return this;
  }

  unionCanton() {
    const w = 14;
    const h = 9;
    this.rect(0, 0, w, h, C.blue);
    this.poly(
      [
        [0, 0],
        [3, 0],
        [w, h - 2],
        [w, h],
        [w - 3, h],
        [0, 2],
      ],
      C.white
    );
    this.poly(
      [
        [w, 0],
        [w - 3, 0],
        [0, h - 2],
        [0, h],
        [3, h],
        [w, 2],
      ],
      C.white
    );
    this.poly(
      [
        [0, 0],
        [2, 0],
        [w, h - 1],
        [w, h],
        [w - 2, h],
        [0, 1],
      ],
      C.red
    );
    this.poly(
      [
        [w, 0],
        [w - 2, 0],
        [0, h - 1],
        [0, h],
        [2, h],
        [w, 1],
      ],
      C.red
    );
    this.rect(0, 3, w, 3, C.white);
    this.rect(5, 0, 4, h, C.white);
    this.rect(0, 4, w, 1, C.red);
    this.rect(6, 0, 2, h, C.red);
    return this;
  }

  southernCross(color, outline = false) {
    for (const [x, y, r] of [
      [24, 4, 2],
      [28, 8, 1.7],
      [23, 12, 1.7],
      [18, 8, 1.4],
    ]) {
      if (outline) this.star(x, y, r + 0.8, 0.8, C.white, -90);
      this.star(x, y, r, 0.7, color, -90);
    }
    return this;
  }

  starRing(cx, cy, color, radius = 5) {
    for (let index = 0; index < 8; index += 1) {
      const angle = (index / 8) * Math.PI * 2;
      this.star(
        cx + Math.cos(angle) * radius,
        cy + Math.sin(angle) * radius,
        1.1,
        0.45,
        color,
        -90
      );
    }
    return this;
  }

  trident(cx, cy, color) {
    this.rect(Math.round(cx) - 1, Math.round(cy) - 4, 2, 8, color);
    this.rect(Math.round(cx) - 4, Math.round(cy) - 4, 2, 4, color);
    this.rect(Math.round(cx) + 2, Math.round(cy) - 4, 2, 4, color);
    this.rect(Math.round(cx) - 4, Math.round(cy), 8, 1, color);
    return this;
  }

  triskelion(cx, cy, color) {
    const x = Math.round(cx);
    const y = Math.round(cy);
    this.rect(x - 1, y - 5, 2, 10, color);
    this.rect(x - 1, y - 1, 8, 2, color);
    this.rect(x - 7, y + 1, 7, 2, color);
    this.pixel(x + 7, y - 2, parseColor(color));
    this.pixel(x - 7, y + 4, parseColor(color));
    return this;
  }

  cedar(cx, cy, color) {
    const x = Math.round(cx);
    const y = Math.round(cy);
    this.poly(
      [
        [x, y - 5],
        [x + 7, y + 2],
        [x - 7, y + 2],
      ],
      color
    );
    this.poly(
      [
        [x, y - 2],
        [x + 6, y + 5],
        [x - 6, y + 5],
      ],
      color
    );
    this.rect(x - 1, y + 3, 2, 4, color);
    return this;
  }

  flower(cx, cy, color) {
    this.disk(cx, cy - 3, 2, color);
    this.disk(cx + 3, cy - 1, 2, color);
    this.disk(cx + 2, cy + 3, 2, color);
    this.disk(cx - 2, cy + 3, 2, color);
    this.disk(cx - 3, cy - 1, 2, color);
    return this;
  }

  fiveStars(color) {
    for (const [x, y] of [
      [12, 7],
      [16, 7],
      [20, 7],
      [14, 11],
      [18, 11],
    ]) {
      this.star(x, y, 1.3, 0.5, color, -90);
    }
    return this;
  }

  checker(cx, cy) {
    const x0 = Math.round(cx) - 3;
    const y0 = Math.round(cy) - 3;
    for (let y = 0; y < 5; y += 1) {
      for (let x = 0; x < 5; x += 1) {
        this.rect(x0 + x, y0 + y, 1, 1, (x + y) % 2 === 0 ? C.red : C.white);
      }
    }
    return this;
  }

  temple(cx, cy, color) {
    this.rect(Math.round(cx) - 5, Math.round(cy) + 1, 10, 1, color);
    this.rect(Math.round(cx) - 4, Math.round(cy), 8, 1, color);
    this.rect(Math.round(cx) - 3, Math.round(cy) - 1, 6, 1, color);
    this.rect(Math.round(cx) - 2, Math.round(cy) - 3, 4, 2, color);
    return this;
  }

  wheel(cx, cy, color) {
    this.disk(cx, cy, 3, color);
    this.disk(cx, cy, 2, C.white);
    this.rect(Math.round(cx) - 3, Math.round(cy), 6, 1, color);
    this.rect(Math.round(cx), Math.round(cy) - 3, 1, 6, color);
    return this;
  }

  hat(cx, cy, color) {
    this.rect(Math.round(cx) - 5, Math.round(cy) + 1, 10, 2, color);
    this.rect(Math.round(cx) - 3, Math.round(cy) - 2, 6, 3, color);
    return this;
  }

  sunrise(cx, cy, color) {
    this.disk(cx, cy + 2, 4, color);
    this.rect(Math.round(cx) - 5, Math.round(cy) + 2, 10, 4, C.black);
    return this;
  }

  sun(cx, cy, color) {
    this.disk(cx, cy, 3, color);
    this.rect(Math.round(cx) - 1, Math.round(cy) - 5, 2, 10, color);
    this.rect(Math.round(cx) - 5, Math.round(cy) - 1, 10, 2, color);
    return this;
  }

  crown(cx, cy, color) {
    this.rect(Math.round(cx) - 4, Math.round(cy) + 1, 8, 2, color);
    this.rect(Math.round(cx) - 3, Math.round(cy) - 1, 2, 3, color);
    this.rect(Math.round(cx) - 1, Math.round(cy) - 2, 2, 4, color);
    this.rect(Math.round(cx) + 2, Math.round(cy) - 1, 2, 3, color);
    return this;
  }

  diamond(cx, cy, color) {
    this.poly(
      [
        [cx, cy - 3],
        [cx + 3, cy],
        [cx, cy + 3],
        [cx - 3, cy],
      ],
      color
    );
    return this;
  }

  starArc(cx, cy, color) {
    for (const [x, y] of [
      [cx - 6, cy - 2],
      [cx - 3, cy - 4],
      [cx, cy - 5],
      [cx + 3, cy - 4],
      [cx + 6, cy - 2],
    ]) {
      this.star(x, y, 1.2, 0.5, color, -90);
    }
    return this;
  }

  disk(cx, cy, radius, color) {
    const rgba = parseColor(color);
    const radiusSquared = radius * radius;
    for (let y = 0; y < HEIGHT; y += 1) {
      for (let x = 0; x < WIDTH; x += 1) {
        const dx = x + 0.5 - cx;
        const dy = y + 0.5 - cy;
        if (dx * dx + dy * dy <= radiusSquared) {
          this.pixel(x, y, rgba);
        }
      }
    }
    return this;
  }

  star(cx, cy, outerRadius, innerRadius, color, rotationDegrees = -90) {
    const points = [];
    const rotation = (rotationDegrees * Math.PI) / 180;
    for (let index = 0; index < 10; index += 1) {
      const radius = index % 2 === 0 ? outerRadius : innerRadius;
      const angle = rotation + (index * Math.PI) / 5;
      points.push([cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius]);
    }
    return this.poly(points, color);
  }

  poly(points, color) {
    const rgba = parseColor(color);
    for (let y = 0; y < HEIGHT; y += 1) {
      for (let x = 0; x < WIDTH; x += 1) {
        if (containsPoint(points, x + 0.5, y + 0.5)) {
          this.pixel(x, y, rgba);
        }
      }
    }
    return this;
  }

  pixel(x, y, rgba) {
    if (x < 0 || x >= WIDTH || y < 0 || y >= HEIGHT) {
      return;
    }
    const offset = (y * WIDTH + x) * 4;
    this.data[offset] = rgba[0];
    this.data[offset + 1] = rgba[1];
    this.data[offset + 2] = rgba[2];
    this.data[offset + 3] = 255;
  }

  async write(outputPath) {
    await this.pngPipeline().toFile(outputPath);
  }

  async pngBuffer() {
    return this.pngPipeline().toBuffer();
  }

  pngPipeline() {
    return sharp(this.data, {
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

  countColors() {
    const colors = new Set();
    for (let offset = 0; offset < this.data.length; offset += 4) {
      colors.add(`${this.data[offset]},${this.data[offset + 1]},${this.data[offset + 2]}`);
    }
    return colors.size;
  }
}
