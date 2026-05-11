import { C } from "../palette.js";

export function draw(p) {
  return p
    .bg(C.blue)
    .star(7, 4, 1.2, 0.5, C.white, -90)
    .star(5, 7, 1.2, 0.5, C.white, -90)
    .star(9, 8, 1.2, 0.5, C.white, -90)
    .star(6, 12, 1.2, 0.5, C.white, -90)
    .poly(
      [
        [13, 12],
        [29, 5],
        [25, 12],
      ],
      C.yellow
    )
    .rect(13, 12, 17, 1, C.yellow);
}
