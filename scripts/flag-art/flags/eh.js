import { C } from "../palette.js";

export function draw(p) {
  return p
    .hstripes([C.black, C.white, C.green])
    .poly(
      [
        [0, 0],
        [13, 9],
        [0, 18],
      ],
      C.red
    )
    .crescent(16, 9, 3, C.red, C.white)
    .star(21, 9, 2.2, 0.9, C.red, -90);
}
