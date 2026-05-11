import { C } from "../palette.js";

export function draw(p) {
  p.bg(C.white);
  p.eagle(16, 8, C.yellow);
  p.rect(7, 5, 2, 8, C.blue);
  p.rect(23, 5, 2, 8, C.blue);
  p.rect(13, 11, 6, 2, C.green);
}
