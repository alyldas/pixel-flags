import { C } from "../palette.js";

export function draw(p) {
  return p.hstripes([C.blue, C.red]).rect(13, 7, 6, 4, C.white).miniSeal(16, 9, C.green);
}
