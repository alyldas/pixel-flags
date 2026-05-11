import { C } from "../palette.js";

export function draw(p) {
  return p
    .rect(0, 0, 8, 18, C.red)
    .rect(8, 0, 24, 6, C.white)
    .rect(8, 6, 24, 6, C.red)
    .rect(8, 12, 24, 6, C.green)
    .rect(2, 3, 3, 4, C.white);
}
