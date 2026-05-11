import { C } from "../palette.js";

export function draw(p) {
  return p.hstripes([C.red, C.yellow, C.green]).star(16, 9, 3.4, 1.4, C.black, -90);
}
