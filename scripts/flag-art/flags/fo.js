import { C } from "../palette.js";

export function draw(p) {
  return p.bg(C.white).cross(C.red, 10, 7, 5, 4).cross(C.blue, 12, 8, 2, 2);
}
