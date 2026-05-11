import { C } from "../palette.js";

export function draw(p) {
  return p
    .bg(C.red)
    .star(7, 6, 4, 1.5, C.yellow, -90)
    .star(14, 3, 1.7, 0.7, C.yellow, -90)
    .star(17, 6, 1.7, 0.7, C.yellow, -90)
    .star(17, 10, 1.7, 0.7, C.yellow, -90)
    .star(14, 13, 1.7, 0.7, C.yellow, -90);
}
