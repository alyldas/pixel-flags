import { C } from "../palette.js";

export function draw(p) {
  return p
    .bg(C.sky)
    .unionCanton()
    .rect(24, 6, 4, 6, C.white)
    .rect(25, 7, 2, 2, C.red)
    .rect(25, 10, 2, 1, C.red);
}
