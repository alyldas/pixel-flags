import { C } from "../palette.js";

export function draw(p) {
  return p.hstripes([C.white, C.sky]).miniSeal(16, 9, C.yellow);
}
