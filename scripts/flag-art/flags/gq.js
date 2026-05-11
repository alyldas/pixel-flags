import { C } from "../palette.js";

export function draw(p) {
  p.hstripes([C.green, C.white, C.red]);
  p.poly(
    [
      [0, 0],
      [12, 9],
      [0, 18],
    ],
    C.sky
  );
  p.miniSeal(16, 9, C.brown);
}
