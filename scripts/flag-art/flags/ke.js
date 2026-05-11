import { C } from "../palette.js";

export function draw(p) {
  p.rect(0, 0, 32, 5, C.black);
  p.rect(0, 6, 32, 6, C.red);
  p.rect(0, 13, 32, 5, C.green);
  p.rect(0, 5, 32, 1, C.white);
  p.rect(0, 12, 32, 1, C.white);
  p.disk(16, 9, 4, C.black);
  p.rect(14, 6, 4, 6, C.red);
  p.rect(15, 5, 2, 8, C.white);
}
