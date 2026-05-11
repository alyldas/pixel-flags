import { C } from "../palette.js";

export function draw(p) {
  p.hstripes([C.black, C.white, C.green]);
  p.poly(
    [
      [0, 0],
      [13, 9],
      [0, 18],
    ],
    C.red
  );
}
