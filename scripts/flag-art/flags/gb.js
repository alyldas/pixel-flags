import { C } from "../palette.js";

export function draw(p) {
  p.bg(C.blue);
  p.poly(
    [
      [0, 0],
      [4, 0],
      [32, 15],
      [32, 18],
      [28, 18],
      [0, 3],
    ],
    C.white
  );
  p.poly(
    [
      [32, 0],
      [28, 0],
      [0, 15],
      [0, 18],
      [4, 18],
      [32, 3],
    ],
    C.white
  );
  p.poly(
    [
      [0, 0],
      [2, 0],
      [32, 16],
      [32, 18],
      [30, 18],
      [0, 2],
    ],
    C.red
  );
  p.poly(
    [
      [32, 0],
      [30, 0],
      [0, 16],
      [0, 18],
      [2, 18],
      [32, 2],
    ],
    C.red
  );
  p.cross(C.white, 13, 6, 6, 6);
  p.cross(C.red, 15, 7, 2, 4);
}
