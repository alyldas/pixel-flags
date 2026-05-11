import { C } from "../palette.js";

export function draw(p) {
  return p
    .rect(0, 0, 16, 18, C.white)
    .rect(16, 0, 16, 18, C.red)
    .rect(3, 3, 4, 1, C.gray)
    .rect(4, 2, 1, 4, C.gray);
}
