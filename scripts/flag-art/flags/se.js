import { C } from "../palette.js";

export function draw(p) {
  return p.bg(C.blue).cross(C.yellow, 10, 7, 4, 4);
}
