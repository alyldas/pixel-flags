import { C } from "../palette.js";

export function draw(p) {
  return p.bg(C.blue).cross(C.yellow, 9, 6, 7, 6).cross(C.red, 11, 8, 3, 2);
}
