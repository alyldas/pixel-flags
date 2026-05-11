import { C } from "../palette.js";

export function draw(p) {
  p.rect(0, 0, 32, 9, C.white);
  p.rect(0, 9, 32, 9, C.red);
  p.poly(
    [
      [0, 0],
      [15, 9],
      [0, 18],
    ],
    C.blue
  );
}
