import { C } from "../palette.js";

export function draw(p) {
  p.rect(0, 0, 32, 18, C.white);
  for (const y of [0, 7, 14]) {
    p.rect(0, y, 32, 4, C.blue);
  }
  p.poly(
    [
      [0, 0],
      [14, 9],
      [0, 18],
    ],
    C.red
  );
  p.star(5, 9, 3, 1.2, C.white, -90);
}
