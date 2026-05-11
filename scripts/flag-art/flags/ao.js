import { C } from "../palette.js";

export function draw(p) {
  return p.hstripes([C.red, C.black]).gear(16, 9, C.yellow);
}
