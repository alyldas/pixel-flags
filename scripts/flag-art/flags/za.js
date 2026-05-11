import { C } from "../palette.js";

export function draw(p) {
  p.rect(0, 0, 32, 9, C.red);
  p.rect(0, 9, 32, 9, C.blue);
  p.poly(
    [
      [0, 0],
      [15, 9],
      [0, 18],
    ],
    C.black
  );
  p.poly(
    [
      [0, 0],
      [19, 9],
      [0, 18],
      [0, 14],
      [12, 9],
      [0, 4],
    ],
    C.yellow
  );
  p.poly(
    [
      [0, 2],
      [14, 9],
      [0, 16],
      [0, 13],
      [9, 9],
      [0, 5],
    ],
    C.green
  );
  p.rect(12, 7, 20, 4, C.green);
  p.rect(13, 6, 19, 1, C.white);
  p.rect(13, 11, 19, 1, C.white);
}
