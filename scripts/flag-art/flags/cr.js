import { C } from "../palette.js";

export function draw(p) {
  return p
    .rect(0, 0, 32, 3, C.blue)
    .rect(0, 3, 32, 3, C.white)
    .rect(0, 6, 32, 6, C.red)
    .rect(0, 12, 32, 3, C.white)
    .rect(0, 15, 32, 3, C.blue);
}
