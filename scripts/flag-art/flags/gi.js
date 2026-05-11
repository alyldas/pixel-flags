import { C } from "../palette.js";

export function draw(p) {
  return p
    .rect(0, 0, 32, 12, C.white)
    .rect(0, 12, 32, 6, C.red)
    .rect(11, 5, 10, 5, C.red)
    .rect(13, 3, 2, 2, C.red)
    .rect(17, 3, 2, 2, C.red)
    .rect(15, 10, 2, 5, C.yellow);
}
