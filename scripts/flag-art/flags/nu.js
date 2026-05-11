import { C } from "../palette.js";

export function draw(p) {
  return p
    .bg(C.yellow)
    .unionCanton()
    .star(22, 8, 2.2, 0.9, C.blue, -90)
    .star(27, 5, 1.6, 0.7, C.blue, -90)
    .star(28, 12, 1.6, 0.7, C.blue, -90);
}
