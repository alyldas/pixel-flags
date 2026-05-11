import { C } from "../palette.js";

export function draw(p) {
  return p
    .bg(C.sky)
    .unionCanton()
    .star(23, 5, 1.8, 0.7, C.yellow, -90)
    .star(27, 9, 1.8, 0.7, C.yellow, -90)
    .star(21, 13, 1.8, 0.7, C.yellow, -90);
}
