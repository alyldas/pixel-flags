import { C } from "../palette.js";

export function draw(p) {
  p.bg(C.red);
  for (const points of [
    [
      [16, 9],
      [0, 0],
      [5, 0],
    ],
    [
      [16, 9],
      [27, 0],
      [32, 0],
    ],
    [
      [16, 9],
      [0, 18],
      [5, 18],
    ],
    [
      [16, 9],
      [27, 18],
      [32, 18],
    ],
    [
      [16, 9],
      [0, 7],
      [0, 11],
    ],
    [
      [16, 9],
      [32, 7],
      [32, 11],
    ],
  ]) {
    p.poly(points, C.yellow);
  }
  p.disk(16, 9, 4, C.yellow);
}
