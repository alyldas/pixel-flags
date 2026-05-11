import { C } from "../palette.js";

export function draw(p) {
  return p
    .rect(0, 0, 32, 4, C.red)
    .rect(0, 4, 32, 10, C.blue)
    .rect(0, 14, 32, 4, C.red)
    .disk(16, 9, 4, C.white);
}
