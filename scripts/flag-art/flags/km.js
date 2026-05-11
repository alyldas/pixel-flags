import { C } from "../palette.js";

export function draw(p) {
  p.rect(0, 0, 32, 5, C.yellow);
  p.rect(0, 5, 32, 4, C.white);
  p.rect(0, 9, 32, 4, C.red);
  p.rect(0, 13, 32, 5, C.blue);
  p.poly(
    [
      [0, 0],
      [12, 9],
      [0, 18],
    ],
    C.green
  );
  p.crescent(5, 9, 3, C.white, C.green);
}
