import { C } from "../palette.js";

export function draw(p) {
  p.rect(0, 0, 8, 18, C.red);
  p.rect(8, 0, 24, 6, C.green);
  p.rect(8, 6, 24, 6, C.white);
  p.rect(8, 12, 24, 6, C.black);
}
