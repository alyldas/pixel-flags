import { C } from "../palette.js";

export function draw(p) {
  p.rect(0, 0, 32, 9, C.green);
  p.rect(0, 9, 32, 9, C.sky);
  p.poly(
    [
      [0, 0],
      [25, 9],
      [0, 18],
    ],
    C.red
  );
  p.rect(5, 6, 2, 6, C.yellow);
  p.rect(4, 11, 5, 1, C.yellow);
}
