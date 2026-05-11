import { C } from "../palette.js";

export function draw(p) {
  p.bg(C.yellow);
  p.poly(
    [
      [0, 4],
      [0, 8],
      [32, 16],
      [32, 12],
    ],
    C.white
  );
  p.poly(
    [
      [0, 6],
      [0, 9],
      [32, 18],
      [32, 15],
    ],
    C.black
  );
  p.rect(15, 6, 2, 8, C.red);
  p.rect(13, 10, 6, 2, C.red);
}
