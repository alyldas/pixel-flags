import { C } from "../palette.js";

export function draw(p) {
  p.rect(0, 0, 32, 9, C.red);
  p.rect(0, 9, 32, 9, C.green);
  p.poly(
    [
      [0, 0],
      [14, 9],
      [0, 18],
    ],
    C.black
  );
  p.poly(
    [
      [0, 1],
      [12, 9],
      [0, 17],
    ],
    C.yellow
  );
  p.poly(
    [
      [0, 3],
      [9, 9],
      [0, 15],
    ],
    C.black
  );
  p.rect(9, 8, 23, 2, C.yellow);
  p.rect(10, 8, 22, 1, C.black);
}
