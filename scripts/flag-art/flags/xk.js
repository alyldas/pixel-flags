import { C } from "../palette.js";

export function draw(p) {
  return p
    .bg(C.blue)
    .poly(
      [
        [13, 8],
        [20, 7],
        [23, 10],
        [18, 13],
        [12, 12],
      ],
      C.yellow
    )
    .starArc(16, 5, C.white);
}
