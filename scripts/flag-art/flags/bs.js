import { C } from "../palette.js";

export function draw(p) {
  p.rect(0, 0, 32, 6, C.aqua);
  p.rect(0, 6, 32, 6, C.yellow);
  p.rect(0, 12, 32, 6, C.aqua);
  p.poly(
    [
      [0, 0],
      [13, 9],
      [0, 18],
    ],
    C.black
  );
}
