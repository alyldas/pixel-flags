import { C } from "../palette.js";

export function draw(p) {
  p.rect(0, 0, 32, 9, C.red);
  p.rect(0, 9, 32, 9, C.blue);
  p.poly(
    [
      [0, 0],
      [17, 9],
      [0, 18],
    ],
    C.white
  );
  p.miniSeal(12, 8, C.yellow);
}
