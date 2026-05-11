import { C } from "../palette.js";

export function draw(p) {
  return p
    .rect(0, 0, 32, 9, C.yellow)
    .rect(0, 9, 32, 4, C.blue)
    .rect(0, 13, 32, 5, C.red)
    .miniSeal(16, 9, C.brown);
}
