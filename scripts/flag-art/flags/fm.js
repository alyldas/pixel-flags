import { C } from "../palette.js";

export function draw(p) {
  return p
    .bg(C.sky)
    .star(16, 4, 2.3, 0.9, C.white, -90)
    .star(16, 14, 2.3, 0.9, C.white, -90)
    .star(10, 9, 2.3, 0.9, C.white, -90)
    .star(22, 9, 2.3, 0.9, C.white, -90);
}
