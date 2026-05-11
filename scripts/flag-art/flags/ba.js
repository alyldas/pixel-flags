import { C } from "../palette.js";

export function draw(p) {
  p.bg(C.blue);
  p.poly(
    [
      [10, 0],
      [27, 0],
      [27, 18],
    ],
    C.yellow
  );
  for (const [x, y] of [
    [12, 2],
    [15, 5],
    [18, 8],
    [21, 11],
    [24, 14],
  ]) {
    p.star(x, y, 1.7, 0.7, C.white, -90);
  }
}
