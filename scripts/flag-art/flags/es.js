import { C } from "../palette.js";

export function draw(p) {
  return p
    .rect(0, 0, 32, 5, C.red)
    .rect(0, 5, 32, 8, C.yellow)
    .rect(0, 13, 32, 5, C.red)
    .miniSeal(10, 9, C.brown);
}
