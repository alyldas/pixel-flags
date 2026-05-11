import { C } from "../palette.js";

export function draw(p) {
  p.bg(C.green);
  p.poly(
    [
      [0, 0],
      [32, 0],
      [0, 18],
    ],
    C.blue
  );
  p.poly(
    [
      [0, 18],
      [32, 2],
      [32, 5],
      [5, 18],
    ],
    C.yellow
  );
  for (const [x, y] of [
    [5, 3],
    [9, 3],
    [7, 6],
    [4, 8],
    [10, 8],
  ])
    p.star(x, y, 1.2, 0.5, C.white, -90);
}
