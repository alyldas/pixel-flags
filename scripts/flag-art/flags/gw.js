import { C } from "../palette.js";

export function draw(p) {
  return p
    .rect(0, 0, 11, 18, C.red)
    .rect(11, 0, 21, 9, C.yellow)
    .rect(11, 9, 21, 9, C.green)
    .star(5.5, 9, 3.4, 1.4, C.black, -90);
}
