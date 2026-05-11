import { C } from "../palette.js";

export function draw(p) {
  return p
    .rect(0, 0, 32, 5, C.red)
    .rect(0, 5, 32, 8, C.black)
    .rect(0, 13, 32, 5, C.green)
    .crescent(15, 9, 4, C.white, C.black)
    .star(20, 9, 2.5, 1, C.white, -90);
}
