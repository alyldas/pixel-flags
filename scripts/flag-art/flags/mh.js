import { C } from "../palette.js";

export function draw(p) {
  p.bg(C.blue);
  p.poly(
    [
      [0, 18],
      [32, 8],
      [32, 12],
    ],
    C.orange
  );
  p.poly(
    [
      [0, 18],
      [32, 3],
      [32, 6],
    ],
    C.white
  );
  p.star(7, 5, 4, 1.5, C.white, -90);
}
