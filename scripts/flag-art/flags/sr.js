import { C } from "../palette.js";

export function draw(p) {
  return p
    .rect(0, 0, 32, 4, C.green)
    .rect(0, 4, 32, 2, C.white)
    .rect(0, 6, 32, 6, C.red)
    .rect(0, 12, 32, 2, C.white)
    .rect(0, 14, 32, 4, C.green)
    .star(16, 9, 4, 1.7, C.yellow, -90);
}
