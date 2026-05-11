import { C } from "../palette.js";

export function draw(p) {
  return p
    .bg(C.sky)
    .rect(0, 12, 32, 2, C.yellow)
    .rect(0, 15, 32, 2, C.yellow)
    .star(7, 5, 3.5, 1.3, C.red, -90);
}
