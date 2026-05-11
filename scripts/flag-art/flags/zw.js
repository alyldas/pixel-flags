import { C } from "../palette.js";

export function draw(p) {
  p.rect(0, 0, 32, 3, C.green);
  p.rect(0, 3, 32, 2, C.yellow);
  p.rect(0, 5, 32, 2, C.red);
  p.rect(0, 7, 32, 4, C.black);
  p.rect(0, 11, 32, 2, C.red);
  p.rect(0, 13, 32, 2, C.yellow);
  p.rect(0, 15, 32, 3, C.green);
  p.poly(
    [
      [0, 0],
      [15, 9],
      [0, 18],
    ],
    C.white
  );
  p.star(5, 9, 3, 1.2, C.red, -90);
}
