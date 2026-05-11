import { C } from "../palette.js";

export function draw(p) {
  p.bg(C.green);
  p.poly(
    [
      [16, 2],
      [28, 9],
      [16, 16],
      [4, 9],
    ],
    C.yellow
  );
  p.disk(16, 9, 5, C.blue);
  p.rect(12, 8, 8, 1, C.white);
}
