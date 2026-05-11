import { C } from "../palette.js";

export function draw(p) {
  p.bg(C.white);
  p.disk(16, 9, 4, C.red);
  p.rect(12, 9, 8, 4, C.blue);
  for (const [x, y] of [
    [6, 4],
    [24, 4],
    [6, 14],
    [24, 14],
  ]) {
    p.rect(x - 2, y - 1, 4, 1, C.black);
    p.rect(x - 2, y + 1, 4, 1, C.black);
  }
}
