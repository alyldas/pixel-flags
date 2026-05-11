import { C } from "../palette.js";

export function draw(p) {
  return p.bg(C.red).cross(C.white, 10, 7, 4, 4);
}
