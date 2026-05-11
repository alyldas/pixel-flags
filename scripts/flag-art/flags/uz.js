import { C } from "../palette.js";

export function draw(p) {
  return p
    .rect(0, 0, 32, 5, C.sky)
    .rect(0, 6, 32, 1, C.red)
    .rect(0, 7, 32, 4, C.white)
    .rect(0, 11, 32, 1, C.red)
    .rect(0, 12, 32, 6, C.green)
    .crescent(7, 3, 2.5, C.white, C.sky)
    .star(13, 2, 1, 0.4, C.white, -90)
    .star(17, 3, 1, 0.4, C.white, -90);
}
