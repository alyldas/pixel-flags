import { C } from "../palette.js";

export function draw(p) {
  p.bg(C.yellow);
  p.rect(3, 3, 4, 12, C.green);
  p.rect(7, 3, 4, 12, C.orange);
  p.rect(12, 2, 18, 14, C.maroon);
  p.eagle(21, 9, C.yellow);
}
