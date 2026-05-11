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
  p.southernCross(C.white, false);
  p.disk(24, 11, 4, C.yellow);
  p.eagle(8, 6, C.yellow);
}
