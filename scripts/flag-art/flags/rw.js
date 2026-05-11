import { C } from "../palette.js";

export function draw(p) {
  return p
    .rect(0, 0, 32, 9, C.sky)
    .rect(0, 9, 32, 4, C.yellow)
    .rect(0, 13, 32, 5, C.green)
    .sun(25, 5, C.yellow);
}
