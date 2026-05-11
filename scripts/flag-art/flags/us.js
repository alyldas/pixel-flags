import { C } from "../palette.js";

export function draw(p) {
  p.bg(C.white);
  for (let y = 0; y < 18; y += 3) p.rect(0, y, 32, 2, C.red);
  p.rect(0, 0, 14, 10, C.blue);
  for (const [x, y] of [
    [2, 2],
    [5, 2],
    [8, 2],
    [11, 2],
    [3, 5],
    [6, 5],
    [9, 5],
    [12, 5],
    [2, 8],
    [5, 8],
    [8, 8],
    [11, 8],
  ])
    p.rect(x, y, 1, 1, C.white);
}
