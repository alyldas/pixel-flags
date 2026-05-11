import { C } from "../palette.js";

export function draw(p) {
  return p
    .bg(C.white)
    .rect(0, 2, 32, 2, C.blue)
    .rect(0, 14, 32, 2, C.blue)
    .star(16, 9, 4, 2, C.blue, -90);
}
