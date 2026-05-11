import { C } from "../palette.js";

export function draw(p) {
  return p.vstripes([C.green, C.red, C.yellow]).star(16, 9, 3.5, 1.5, C.yellow, -90);
}
