import { C } from "../palette.js";

export function draw(p) {
  p.bg(C.blue);
  p.rect(0, 0, 15, 8, C.white);
  p.rect(0, 0, 5, 8, C.blue);
  p.rect(10, 0, 5, 8, C.red);
  p.rect(20, 8, 2, 7, C.white);
  p.rect(17, 11, 8, 2, C.white);
  p.rect(24, 8, 2, 7, C.white);
  p.star(20, 4, 1.3, 0.5, C.white, -90);
  p.star(25, 4, 1.3, 0.5, C.white, -90);
  p.star(18, 13, 1.3, 0.5, C.white, -90);
  p.star(23, 15, 1.3, 0.5, C.white, -90);
  p.star(28, 13, 1.3, 0.5, C.white, -90);
}
