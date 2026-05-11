import { C } from "../palette.js";

export function draw(p) {
  return p
    .bg(C.red)
    .rect(0, 0, 15, 9, C.blue)
    .star(6, 3, 1.5, 0.6, C.white, -90)
    .star(10, 5, 1.5, 0.6, C.white, -90)
    .star(5, 7, 1.5, 0.6, C.white, -90);
}
