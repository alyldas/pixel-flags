import { C } from "../palette.js";

export function draw(p) {
  return p.hstripes([C.white, C.blue, C.red]).miniSeal(8, 6, C.sky);
}
