import { C } from "../palette.js";

export function draw(p) {
  return p
    .bg(C.blue)
    .star(16, 9, 5, 2, C.white, -90)
    .rect(15, 6, 2, 7, C.gray)
    .rect(13, 11, 6, 2, C.gray);
}
