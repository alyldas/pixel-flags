import { HEIGHT, WIDTH } from "./constants.js";
import { containsPoint, parseColor, splitEvenly } from "./geometry.js";
import { C } from "./palette.js";

export class Raster {
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

  countColors() {
    const colors = new Set();
    for (let offset = 0; offset < this.data.length; offset += 4) {
      colors.add(`${this.data[offset]},${this.data[offset + 1]},${this.data[offset + 2]}`);
    }
    return colors.size;
  }
}
