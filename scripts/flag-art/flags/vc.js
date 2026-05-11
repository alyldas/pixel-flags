import { C } from "../palette.js";

export function draw(p) {
  return p
    .rect(0, 0, 8, 18, C.blue)
    .rect(8, 0, 16, 18, C.yellow)
    .rect(24, 0, 8, 18, C.green)
    .diamond(16, 7, C.green)
    .diamond(13, 11, C.green)
    .diamond(19, 11, C.green);
}
