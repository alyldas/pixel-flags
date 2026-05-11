import { C } from "../palette.js";

export function draw(p) {
  p.rect(0, 0, 5, 18, C.white);
  for (let y = 1; y < 18; y += 4) {
    p.rect(1, y, 3, 2, C.red);
  }
  p.rect(5, 0, 27, 12, C.red);
  p.rect(5, 12, 27, 6, C.green);
}
