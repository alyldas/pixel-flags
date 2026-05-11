import { C } from "../palette.js";

export function draw(p) {
  p.bg(C.red);
  p.poly(
    [
      [0, 18],
      [32, 18],
      [32, 6],
    ],
    C.white
  );
  p.poly(
    [
      [0, 18],
      [32, 18],
      [32, 12],
    ],
    C.green
  );
  p.poly(
    [
      [0, 18],
      [0, 0],
      [21, 0],
    ],
    C.yellow
  );
  p.poly(
    [
      [0, 18],
      [0, 0],
      [11, 0],
    ],
    C.blue
  );
}
