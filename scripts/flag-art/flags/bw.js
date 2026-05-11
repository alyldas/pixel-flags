import { C } from "../palette.js";

export function draw(p) {
  p.bg(C.sky);
  p.rect(0, 7, 32, 4, C.white);
  p.rect(0, 8, 32, 2, C.black);
}
