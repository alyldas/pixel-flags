import { C } from "../palette.js";

export function draw(p) {
  return p.bg(C.sky).disk(14, 9, 5, C.yellow);
}
