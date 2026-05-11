import { C } from "../palette.js";

export function draw(p) {
  p.bg(C.blue);
  p.poly(
    [
      [32, 0],
      [0, 9],
      [32, 18],
    ],
    C.red
  );
  p.poly(
    [
      [32, 2],
      [4, 9],
      [32, 16],
    ],
    C.white
  );
  p.eagle(23, 9, C.yellow);
  p.rect(24, 8, 3, 2, C.white);
}
