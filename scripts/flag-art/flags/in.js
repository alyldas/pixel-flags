import { C } from "../palette.js";

export function draw(p) {
  return p.hstripes([C.orange, C.white, C.green]).wheel(16, 9, C.blue);
}
