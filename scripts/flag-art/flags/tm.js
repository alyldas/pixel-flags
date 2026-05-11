import { C } from "../palette.js";

export function draw(p) {
  return p
    .bg(C.green)
    .rect(3, 0, 5, 18, C.red)
    .crescent(17, 5, 3, C.white, C.green)
    .star(23, 3, 1.1, 0.5, C.white, -90)
    .star(24, 7, 1.1, 0.5, C.white, -90)
    .star(21, 10, 1.1, 0.5, C.white, -90);
}
