import { C } from "../palette.js";

export function draw(p) {
  return p
    .bg(C.white)
    .poly(
      [
        [0, 0],
        [3, 0],
        [32, 16],
        [32, 18],
        [29, 18],
        [0, 2],
      ],
      C.red
    )
    .poly(
      [
        [32, 0],
        [29, 0],
        [0, 16],
        [0, 18],
        [3, 18],
        [32, 2],
      ],
      C.red
    )
    .rect(15, 2, 2, 3, C.yellow);
}
