import { C } from "../palette.js";

export function draw(p) {
  return p
    .rect(0, 0, 8, 18, C.red)
    .rect(8, 0, 16, 18, C.white)
    .rect(24, 0, 8, 18, C.red)
    .maple(16, 9, C.red);
}
