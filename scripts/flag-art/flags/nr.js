import { C } from "../palette.js";

export function draw(p) {
  return p.bg(C.blue).rect(0, 9, 32, 2, C.yellow).star(9, 13, 3, 1.2, C.white, -90);
}
