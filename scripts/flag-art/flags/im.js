import { C } from "../palette.js";

export function draw(p) {
  return p.bg(C.red).triskelion(16, 9, C.yellow);
}
