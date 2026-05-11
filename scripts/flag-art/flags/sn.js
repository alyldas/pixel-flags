import { C } from "../palette.js";

export function draw(p) {
  return p.vstripes([C.green, C.yellow, C.red]).star(16, 9, 3.4, 1.4, C.green, -90);
}
