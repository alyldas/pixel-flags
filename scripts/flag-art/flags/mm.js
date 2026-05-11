import { C } from "../palette.js";

export function draw(p) {
  return p.hstripes([C.yellow, C.green, C.red]).star(16, 9, 5, 2.1, C.white, -90);
}
