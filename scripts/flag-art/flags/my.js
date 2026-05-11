import { C } from "../palette.js";

export function draw(p) {
  p.bg(C.white);
  for (let y = 0; y < 18; y += 3) p.rect(0, y, 32, 2, C.red);
  p.rect(0, 0, 15, 10, C.blue);
  p.crescent(7, 5, 3, C.yellow, C.blue);
  p.star(11, 5, 2.4, 1, C.yellow, -90);
}
