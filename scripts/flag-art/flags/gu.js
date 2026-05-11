import { C } from "../palette.js";

export function draw(p) {
  return p
    .bg(C.blue)
    .rect(0, 0, 32, 2, C.red)
    .rect(0, 16, 32, 2, C.red)
    .rect(0, 0, 2, 18, C.red)
    .rect(30, 0, 2, 18, C.red)
    .diamond(16, 9, C.white)
    .rect(14, 8, 4, 2, C.sky);
}
