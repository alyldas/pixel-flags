import { C } from "../palette.js";

export function draw(p) {
  return p.bg(C.red).star(16, 9, 5.5, 2.2, C.yellow, -90);
}
