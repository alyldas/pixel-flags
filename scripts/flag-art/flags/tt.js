import { C } from "../palette.js";

export function draw(p) {
  return p
    .bg(C.red)
    .poly(
      [
        [0, 0],
        [5, 0],
        [32, 15],
        [32, 18],
        [27, 18],
        [0, 3],
      ],
      C.white
    )
    .poly(
      [
        [2, 0],
        [7, 0],
        [32, 14],
        [32, 18],
        [25, 18],
        [0, 4],
        [0, 0],
      ],
      C.black
    );
}
