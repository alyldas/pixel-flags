import { C } from "../palette.js";

export function draw(p) {
  return p
    .rect(0, 0, 32, 3, C.black)
    .rect(0, 3, 32, 3, C.yellow)
    .rect(0, 6, 32, 3, C.red)
    .rect(0, 9, 32, 3, C.black)
    .rect(0, 12, 32, 3, C.yellow)
    .rect(0, 15, 32, 3, C.red)
    .disk(16, 9, 3, C.white);
}
