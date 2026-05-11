import { C } from "../palette.js";

export function draw(p) {
  p.bg(C.red);
  p.rect(0, 0, 9, 18, C.white);
  for (let y = 0; y < 18; y += 4) {
    p.poly(
      [
        [9, y],
        [13, y + 2],
        [9, y + 4],
      ],
      C.white
    );
  }
}
