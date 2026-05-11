import { C } from "../palette.js";

export function draw(p) {
  p.hstripes([C.black, C.white, C.green]);
  p.poly(
    [
      [0, 0],
      [14, 9],
      [0, 18],
    ],
    C.red
  );
  p.star(5, 9, 2, 0.8, C.white, -90);
}
