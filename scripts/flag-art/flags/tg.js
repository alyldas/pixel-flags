import { C } from "../palette.js";

export function draw(p) {
  p.rect(0, 0, 32, 4, C.green);
  p.rect(0, 4, 32, 4, C.yellow);
  p.rect(0, 8, 32, 4, C.green);
  p.rect(0, 12, 32, 3, C.yellow);
  p.rect(0, 15, 32, 3, C.green);
  p.rect(0, 0, 13, 10, C.red);
  p.star(6, 5, 3, 1.2, C.white, -90);
}
