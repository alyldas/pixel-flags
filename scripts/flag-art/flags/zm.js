import { C } from "../palette.js";

export function draw(p) {
  return p
    .bg(C.green)
    .rect(24, 10, 3, 8, C.red)
    .rect(27, 10, 3, 8, C.black)
    .rect(30, 10, 2, 8, C.orange)
    .eagle(27, 7, C.orange);
}
