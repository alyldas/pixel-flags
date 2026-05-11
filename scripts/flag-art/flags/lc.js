import { C } from "../palette.js";

export function draw(p) {
  p.bg(C.sky);
  p.poly(
    [
      [16, 3],
      [24, 15],
      [8, 15],
    ],
    C.white
  );
  p.poly(
    [
      [16, 5],
      [22, 15],
      [10, 15],
    ],
    C.black
  );
  p.poly(
    [
      [16, 9],
      [21, 15],
      [11, 15],
    ],
    C.yellow
  );
}
