import { C } from "../palette.js";

export function draw(p) {
  p.rect(0, 0, 32, 9, C.white);
  p.rect(0, 9, 32, 9, C.red);
  p.rect(0, 0, 11, 9, C.blue);
  p.star(5.5, 4.5, 3, 1.25, C.white, -90);
}
