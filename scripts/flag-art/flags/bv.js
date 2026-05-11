import { C } from "../palette.js";

export function draw(p) {
  return p.bg(C.red).cross(C.white, 8, 6, 7, 6).cross(C.blue, 10, 8, 3, 2);
}
