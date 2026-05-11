import { C } from "../palette.js";

export function draw(p) {
  p.bg(C.white);
  p.cross(C.red, 14, 7, 4, 4);
  for (const [x, y] of [
    [7, 4],
    [25, 4],
    [7, 14],
    [25, 14],
  ]) {
    p.rect(x - 1, y, 3, 1, C.red);
    p.rect(x, y - 1, 1, 3, C.red);
  }
}
