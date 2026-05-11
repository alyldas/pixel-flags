import { C } from "../palette.js";

export function draw(p) {
  return p.bg(C.darkGreen).disk(14, 9, 5, C.red);
}
