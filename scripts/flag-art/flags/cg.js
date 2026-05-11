import { C } from "../palette.js";

export function draw(p) {
  return p
    .bg(C.yellow)
    .poly(
      [
        [0, 0],
        [20, 0],
        [0, 18],
      ],
      C.green
    )
    .poly(
      [
        [32, 0],
        [12, 18],
        [32, 18],
      ],
      C.red
    );
}
