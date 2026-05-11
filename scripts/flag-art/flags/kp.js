import { C } from "../palette.js";

export function draw(p) {
  return p
    .rect(0, 0, 32, 3, C.blue)
    .rect(0, 3, 32, 2, C.white)
    .rect(0, 5, 32, 8, C.red)
    .rect(0, 13, 32, 2, C.white)
    .rect(0, 15, 32, 3, C.blue)
    .disk(10, 9, 4, C.white)
    .star(10, 9, 3, 1.2, C.red, -90);
}
