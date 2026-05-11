import { C } from "../palette.js";

export function draw(p) {
  p.bg(C.black);
  p.poly(
    [
      [32, 0],
      [0, 0],
      [32, 18],
    ],
    C.red
  );
  p.eagle(23, 6, C.yellow);
  for (const [x, y] of [
    [6, 6],
    [9, 10],
    [4, 12],
  ])
    p.star(x, y, 1.5, 0.6, C.white, -90);
}
