import { C } from "../palette.js";

export function draw(p) {
  return p.hstripes([C.red, C.blue, C.white]).miniSeal(11, 9, C.yellow);
}
