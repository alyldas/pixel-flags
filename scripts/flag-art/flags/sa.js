import { C } from "../palette.js";

export function draw(p) {
  return p
    .bg(C.darkGreen)
    .rect(8, 6, 16, 2, C.white)
    .rect(10, 10, 12, 1, C.white)
    .rect(22, 9, 4, 1, C.white);
}
