import { C } from "../palette.js";

export function draw(p) {
  return p.bg(C.blue).cross(C.white, 8, 6, 7, 6).cross(C.red, 10, 8, 3, 2);
}
