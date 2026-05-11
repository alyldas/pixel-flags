import { C } from "../palette.js";

export function draw(p) {
  return p
    .rect(0, 0, 32, 5, C.red)
    .rect(0, 6, 32, 6, C.blue)
    .rect(0, 13, 32, 5, C.green)
    .rect(0, 5, 32, 1, C.white)
    .rect(0, 12, 32, 1, C.white);
}
