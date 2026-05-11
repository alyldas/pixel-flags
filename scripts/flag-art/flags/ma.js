import { C } from "../palette.js";

export function draw(p) {
  return p.bg(C.red).star(16, 9, 4.8, 2, C.green, -90);
}
