import { C } from "../palette.js";

export function draw(p) {
  return p.bg(C.red).flower(16, 9, C.white);
}
