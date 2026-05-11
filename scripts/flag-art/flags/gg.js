import { C } from "../palette.js";

export function draw(p) {
  return p.bg(C.white).cross(C.red, 14, 7, 4, 4).cross(C.yellow, 15, 8, 2, 2);
}
