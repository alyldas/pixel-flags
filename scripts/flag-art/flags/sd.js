import { C } from "../palette.js";

export function draw(p) {
  p.hstripes([C.red, C.white, C.black]);
  p.poly(
    [
      [0, 0],
      [13, 9],
      [0, 18],
    ],
    C.green
  );
}
