import { C } from "../palette.js";

export function draw(p) {
  p.bg(C.green);
  p.poly(
    [
      [0, 0],
      [32, 9],
      [0, 18],
    ],
    C.white
  );
  p.poly(
    [
      [0, 2],
      [27, 9],
      [0, 16],
    ],
    C.yellow
  );
  p.poly(
    [
      [0, 0],
      [16, 9],
      [0, 18],
    ],
    C.black
  );
  p.poly(
    [
      [0, 2],
      [13, 9],
      [0, 16],
    ],
    C.red
  );
}
