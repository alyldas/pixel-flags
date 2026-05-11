import { C } from "../palette.js";

export function draw(p) {
  return p.bg(C.white).disk(16, 9, 5, C.red);
}
