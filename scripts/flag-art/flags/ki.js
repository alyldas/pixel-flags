import { C } from "../palette.js";

export function draw(p) {
  p.rect(0, 0, 32, 9, C.red);
  p.rect(0, 9, 32, 9, C.blue);
  p.sunrise(15, 8, C.yellow);
  p.rect(0, 11, 32, 1, C.white);
  p.rect(0, 14, 32, 1, C.white);
  p.eagle(16, 5, C.yellow);
}
