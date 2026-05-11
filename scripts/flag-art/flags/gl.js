import { C } from "../palette.js";

export function draw(p) {
  return p
    .rect(0, 0, 32, 9, C.white)
    .rect(0, 9, 32, 9, C.red)
    .rect(11, 5, 10, 4, C.red)
    .rect(11, 9, 10, 4, C.white);
}
