import { C } from "../palette.js";

export function draw(p) {
  p.bg(C.green);
  p.poly(
    [
      [32, 0],
      [0, 18],
      [32, 18],
    ],
    C.red
  );
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
    C.black
  );
  p.star(12, 12, 2, 0.8, C.white, -90);
  p.star(21, 6, 2, 0.8, C.white, -90);
}
