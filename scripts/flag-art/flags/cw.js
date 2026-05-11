import { C } from "../palette.js";

export function draw(p) {
  return p
    .bg(C.blue)
    .rect(0, 12, 32, 2, C.yellow)
    .star(7, 5, 2.5, 1, C.white, -90)
    .star(11, 7, 2, 0.8, C.white, -90);
}
