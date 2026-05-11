import { C } from "../palette.js";

export function draw(p) {
  p.rect(0, 0, 32, 9, C.blue);
  p.rect(0, 9, 32, 9, C.red);
  p.poly(
    [
      [0, 0],
      [14, 9],
      [0, 18],
    ],
    C.white
  );
  p.sun(5, 9, C.yellow);
  p.star(2, 3, 1.2, 0.5, C.yellow, -90);
  p.star(2, 15, 1.2, 0.5, C.yellow, -90);
  p.star(10, 9, 1.2, 0.5, C.yellow, -90);
}
