import { C } from "../palette.js";

export function draw(p) {
  p.bg(C.green);
  p.poly(
    [
      [0, 0],
      [32, 0],
      [0, 18],
    ],
    C.blue
  );
  p.poly(
    [
      [0, 16],
      [30, 0],
      [32, 0],
      [2, 18],
    ],
    C.white
  );
  p.poly(
    [
      [0, 18],
      [32, 2],
      [32, 6],
      [6, 18],
    ],
    C.red
  );
  p.sun(6, 5, C.yellow);
}
