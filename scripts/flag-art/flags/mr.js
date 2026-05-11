import { C } from "../palette.js";

export function draw(p) {
  return p
    .rect(0, 0, 32, 4, C.red)
    .rect(0, 4, 32, 10, C.green)
    .rect(0, 14, 32, 4, C.red)
    .crescent(16, 10, 4, C.yellow, C.green)
    .star(16, 7, 2.5, 1, C.yellow, -90);
}
