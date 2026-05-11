import { C } from "../palette.js";

export function draw(p) {
  return p
    .bg(C.red)
    .poly(
      [
        [0, 0],
        [18, 9],
        [0, 18],
      ],
      C.yellow
    )
    .poly(
      [
        [0, 0],
        [11, 9],
        [0, 18],
      ],
      C.black
    )
    .star(4, 9, 2.5, 1, C.white, -90);
}
