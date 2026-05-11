import { C } from "../palette.js";

export function draw(p) {
  p.rect(0, 0, 32, 5, C.black);
  p.rect(0, 6, 32, 5, C.red);
  p.rect(0, 13, 32, 5, C.green);
  p.rect(0, 5, 32, 1, C.white);
  p.rect(0, 12, 32, 1, C.white);
  p.poly(
    [
      [0, 0],
      [14, 9],
      [0, 18],
    ],
    C.blue
  );
  p.star(5, 9, 3, 1.2, C.yellow, -90);
}
