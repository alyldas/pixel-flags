import { C } from "../palette.js";

export function draw(p) {
  p.rect(0, 0, 32, 5, C.blue);
  p.rect(0, 5, 32, 4, C.white);
  p.rect(0, 9, 32, 4, C.green);
  p.rect(0, 13, 32, 5, C.yellow);
  p.rect(14, 0, 4, 18, C.red);
  p.star(5, 3, 2, 0.8, C.yellow, -90);
}
