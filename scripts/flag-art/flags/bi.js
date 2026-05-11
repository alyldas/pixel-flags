import { C } from "../palette.js";

export function draw(p) {
  p.bg(C.white);
  p.poly(
    [
      [0, 0],
      [13, 9],
      [0, 18],
    ],
    C.green
  );
  p.poly(
    [
      [32, 0],
      [19, 9],
      [32, 18],
    ],
    C.green
  );
  p.poly(
    [
      [0, 0],
      [16, 7],
      [32, 0],
    ],
    C.red
  );
  p.poly(
    [
      [0, 18],
      [16, 11],
      [32, 18],
    ],
    C.red
  );
  p.disk(16, 9, 4, C.white);
  p.star(16, 6, 1.3, 0.5, C.red, -90);
  p.star(13, 11, 1.3, 0.5, C.red, -90);
  p.star(19, 11, 1.3, 0.5, C.red, -90);
}
