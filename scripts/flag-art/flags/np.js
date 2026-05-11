import { C } from "../palette.js";

export function draw(p) {
  p.bg(C.white);
  p.poly(
    [
      [3, 0],
      [20, 7],
      [9, 9],
      [22, 18],
      [3, 18],
    ],
    C.blue
  );
  p.poly(
    [
      [5, 2],
      [16, 7],
      [7, 9],
      [18, 16],
      [5, 16],
    ],
    C.red
  );
  p.crescent(8, 7, 2.4, C.white, C.red);
  p.star(10, 14, 2.2, 0.9, C.white, -90);
}
