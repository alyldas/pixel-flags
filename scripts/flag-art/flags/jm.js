import { C } from "../palette.js";

export function draw(p) {
  p.bg(C.green);
  p.poly(
    [
      [0, 0],
      [16, 8],
      [32, 0],
      [32, 3],
      [16, 10],
      [0, 3],
    ],
    C.yellow
  );
  p.poly(
    [
      [0, 18],
      [16, 10],
      [32, 18],
      [32, 15],
      [16, 8],
      [0, 15],
    ],
    C.yellow
  );
  p.poly(
    [
      [0, 0],
      [14, 9],
      [0, 18],
    ],
    C.black
  );
  p.poly(
    [
      [32, 0],
      [18, 9],
      [32, 18],
    ],
    C.black
  );
}
