import { C } from "../palette.js";

export function draw(p) {
  p.bg(C.sky);
  p.poly(
    [
      [0, 18],
      [4, 18],
      [32, 3],
      [32, 0],
      [28, 0],
      [0, 15],
    ],
    C.yellow
  );
  p.poly(
    [
      [0, 18],
      [2, 18],
      [32, 2],
      [32, 0],
      [30, 0],
      [0, 16],
    ],
    C.red
  );
  p.star(7, 5, 3, 1.2, C.yellow, -90);
}
