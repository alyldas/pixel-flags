import { C } from "../palette.js";

export function draw(p) {
  return p.bg(C.red).rect(0, 0, 13, 9, C.white).rect(5, 2, 3, 5, C.red).rect(3, 4, 7, 2, C.red);
}
