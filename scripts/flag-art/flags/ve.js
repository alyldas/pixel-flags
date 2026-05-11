import { C } from "../palette.js";

export function draw(p) {
  return p.hstripes([C.yellow, C.blue, C.red]).starArc(16, 9, C.white);
}
