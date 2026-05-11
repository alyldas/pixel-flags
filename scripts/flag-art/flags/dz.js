import { C } from "../palette.js";

export function draw(p) {
  return p
    .rect(0, 0, 16, 18, C.green)
    .rect(16, 0, 16, 18, C.white)
    .crescent(16, 9, 5, C.red, C.white)
    .star(20, 9, 3, 1.2, C.red, -90);
}
