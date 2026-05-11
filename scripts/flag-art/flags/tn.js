import { C } from "../palette.js";

export function draw(p) {
  return p
    .bg(C.red)
    .disk(16, 9, 5, C.white)
    .crescent(15, 9, 3, C.red, C.white)
    .star(19, 9, 2.2, 0.9, C.red, -90);
}
