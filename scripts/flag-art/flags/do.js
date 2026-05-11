import { C } from "../palette.js";

export function draw(p) {
  p.rect(0, 0, 14, 7, C.blue);
  p.rect(18, 0, 14, 7, C.red);
  p.rect(0, 11, 14, 7, C.red);
  p.rect(18, 11, 14, 7, C.blue);
  p.rect(14, 0, 4, 18, C.white);
  p.rect(0, 7, 32, 4, C.white);
  p.rect(15, 8, 2, 2, C.green);
}
