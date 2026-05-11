import { C } from "../palette.js";

export function draw(p) {
  p.bg(C.sky);
  p.poly(
    [
      [0, 0],
      [32, 0],
      [0, 18],
    ],
    C.green
  );
  p.poly(
    [
      [0, 18],
      [32, 2],
      [32, 7],
      [8, 18],
    ],
    C.yellow
  );
  p.poly(
    [
      [0, 18],
      [32, 5],
      [32, 10],
      [12, 18],
    ],
    C.black
  );
}
