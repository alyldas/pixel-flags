import { C } from "../palette.js";

export function draw(p) {
  return p.bg(C.red).disk(16, 9, 5, C.yellow).rect(12, 8, 8, 2, C.red).rect(15, 5, 2, 8, C.red);
}
