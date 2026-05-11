import { C } from "../palette.js";

export function draw(p) {
  p.bg(C.red);
  p.disk(12, 9, 5, C.white);
  p.disk(14, 9, 4, C.red);
  p.star(21, 9, 3.2, 1.35, C.white, -90);
}
