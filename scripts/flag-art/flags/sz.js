import { C } from "../palette.js";

export function draw(p) {
  p.rect(0, 0, 32, 4, C.blue);
  p.rect(0, 4, 32, 2, C.yellow);
  p.rect(0, 6, 32, 6, C.red);
  p.rect(0, 12, 32, 2, C.yellow);
  p.rect(0, 14, 32, 4, C.blue);
  p.rect(11, 8, 10, 2, C.white);
  p.rect(14, 6, 4, 6, C.black);
}
