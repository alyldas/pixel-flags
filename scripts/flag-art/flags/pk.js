import { C } from "../palette.js";

export function draw(p) {
  p.rect(0, 0, 8, 18, C.white);
  p.rect(8, 0, 24, 18, C.darkGreen);
  p.disk(19, 9, 5, C.white);
  p.disk(21, 8, 4, C.darkGreen);
  p.star(25, 7, 2.6, 1, C.white, -90);
}
