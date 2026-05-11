import { C } from "../palette.js";

export function draw(p) {
  p.bg(C.maroon);
  p.rect(0, 0, 8, 18, C.white);
  for (let y = 0; y < 18; y += 2) {
    p.poly(
      [
        [8, y],
        [12, y + 1],
        [8, y + 2],
      ],
      C.white
    );
  }
}
