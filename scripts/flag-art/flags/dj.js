import { C } from "../palette.js";

export function draw(p) {
  p.rect(0, 0, 32, 9, C.sky);
  p.rect(0, 9, 32, 9, C.green);
  p.poly(
    [
      [0, 0],
      [15, 9],
      [0, 18],
    ],
    C.white
  );
  p.star(5, 9, 2.7, 1.1, C.red, -90);
}
