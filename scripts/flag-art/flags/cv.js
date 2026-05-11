import { C } from "../palette.js";

export function draw(p) {
  p.bg(C.blue);
  p.rect(0, 10, 32, 2, C.white);
  p.rect(0, 12, 32, 2, C.red);
  p.rect(0, 14, 32, 2, C.white);
  p.starRing(11, 9, C.yellow);
}
