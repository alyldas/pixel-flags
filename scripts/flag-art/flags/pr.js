import { C } from "../palette.js";

export function draw(p) {
  p.bg(C.white);
  for (let y = 0; y < 18; y += 4) {
    p.rect(0, y, 32, 2, C.red);
  }
  p.poly(
    [
      [0, 0],
      [15, 9],
      [0, 18],
    ],
    C.blue
  );
  p.star(5, 9, 3, 1.2, C.white, -90);
}
