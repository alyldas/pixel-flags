import { C } from "../palette.js";

export function draw(p) {
  return p
    .bg(C.green)
    .flower(16, 10, C.white)
    .star(16, 3, 1.6, 0.7, C.yellow, -90)
    .star(12, 5, 1.2, 0.5, C.yellow, -90)
    .star(20, 5, 1.2, 0.5, C.yellow, -90);
}
