import { C } from "../palette.js";

export function draw(p) {
  return p.bg(C.sky).star(16, 9, 5, 2.2, C.white, -90);
}
