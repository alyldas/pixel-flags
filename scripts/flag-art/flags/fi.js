import { C } from "../palette.js";

export function draw(p) {
  return p.bg(C.white).cross(C.blue, 10, 7, 4, 4);
}
