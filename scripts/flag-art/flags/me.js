import { C } from "../palette.js";

export function draw(p) {
  return p
    .bg(C.red)
    .rect(0, 0, 32, 2, C.yellow)
    .rect(0, 16, 32, 2, C.yellow)
    .rect(0, 0, 2, 18, C.yellow)
    .rect(30, 0, 2, 18, C.yellow)
    .eagle(16, 9, C.yellow);
}
