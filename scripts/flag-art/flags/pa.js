import { C } from "../palette.js";

export function draw(p) {
  p.rect(0, 0, 16, 9, C.white);
  p.rect(16, 0, 16, 9, C.red);
  p.rect(0, 9, 16, 9, C.blue);
  p.rect(16, 9, 16, 9, C.white);
  p.star(8, 4.5, 2.6, 1.1, C.blue, -90);
  p.star(24, 13.5, 2.6, 1.1, C.red, -90);
}
