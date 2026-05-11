import { C } from "../palette.js";

export function draw(p) {
  return p.hstripes([C.green, C.white, C.red]).poly(
    [
      [0, 0],
      [9, 5],
      [9, 13],
      [0, 18],
    ],
    C.black
  );
}
