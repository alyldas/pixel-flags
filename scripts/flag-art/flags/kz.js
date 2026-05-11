import { C } from "../palette.js";

export function draw(p) {
  return p.bg(C.sky).rect(0, 0, 3, 18, C.yellow).disk(17, 7, 3, C.yellow).eagle(17, 12, C.yellow);
}
