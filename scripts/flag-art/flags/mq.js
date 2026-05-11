import { C } from "../palette.js";

export function draw(p) {
  return p
    .rect(0, 0, 32, 9, C.green)
    .rect(0, 9, 32, 9, C.black)
    .poly(
      [
        [0, 0],
        [13, 9],
        [0, 18],
      ],
      C.red
    );
}
