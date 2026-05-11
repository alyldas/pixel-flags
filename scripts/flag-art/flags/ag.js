import { C } from "../palette.js";

export function draw(p) {
  p.bg(C.red);
  p.poly(
    [
      [0, 0],
      [16, 18],
      [32, 0],
    ],
    C.black
  );
  p.rect(7, 8, 18, 5, C.blue);
  p.rect(5, 13, 22, 5, C.white);
  p.star(16, 7, 5, 1.8, C.yellow, -90);
}
