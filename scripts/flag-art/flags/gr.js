import { C } from "../palette.js";

export function draw(p) {
  p.rect(0, 0, 32, 18, C.white);
  for (const y of [0, 4, 8, 12, 16]) {
    p.rect(0, y, 32, 2, C.blue);
  }
  p.rect(0, 0, 12, 10, C.blue);
  p.rect(5, 0, 2, 10, C.white);
  p.rect(0, 4, 12, 2, C.white);
}
