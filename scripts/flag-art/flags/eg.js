import { C } from "../palette.js";

export function draw(p) {
  return p.hstripes([C.red, C.white, C.black]).miniSeal(16, 9, C.gold);
}
