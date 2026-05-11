import { C } from "../palette.js";

export function draw(p) {
  return p
    .bg(C.white)
    .rect(0, 2, 32, 2, C.blue)
    .rect(0, 6, 32, 2, C.blue)
    .rect(0, 10, 32, 2, C.blue)
    .rect(0, 14, 32, 2, C.blue)
    .rect(0, 0, 11, 9, C.white)
    .sun(5.5, 4.5, C.yellow);
}
