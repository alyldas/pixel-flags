import { C } from "../palette.js";

export function draw(p) {
  return p
    .rect(0, 0, 32, 4, C.blue)
    .rect(0, 4, 32, 10, C.red)
    .rect(0, 14, 32, 4, C.blue)
    .temple(16, 10, C.white);
}
