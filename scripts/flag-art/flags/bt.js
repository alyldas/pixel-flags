import { C } from "../palette.js";

export function draw(p) {
  p.bg(C.orange);
  p.poly(
    [
      [0, 0],
      [32, 0],
      [0, 18],
    ],
    C.yellow
  );
  p.rect(11, 7, 11, 2, C.white);
  p.rect(14, 5, 2, 8, C.white);
  p.rect(20, 6, 2, 2, C.white);
}
