import { C } from "../palette.js";

export function draw(p) {
  p.bg(C.red);
  p.rect(14, 4, 4, 10, C.white);
  p.rect(10, 7, 12, 4, C.white);
}
