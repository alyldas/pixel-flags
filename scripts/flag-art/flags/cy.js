import { C } from "../palette.js";

export function draw(p) {
  return p
    .bg(C.white)
    .poly(
      [
        [13, 8],
        [19, 6],
        [24, 9],
        [18, 11],
      ],
      C.orange
    )
    .rect(13, 13, 8, 1, C.green)
    .rect(16, 12, 8, 1, C.green);
}
