import { C } from "../palette.js";

export function draw(p) {
  return p
    .hstripes([C.green, C.yellow, C.green])
    .poly(
      [
        [0, 0],
        [12, 9],
        [0, 18],
      ],
      C.red
    )
    .star(16, 9, 2.5, 1, C.black, -90)
    .star(22, 9, 2.5, 1, C.black, -90);
}
