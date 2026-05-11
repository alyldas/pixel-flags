import { C } from "../palette.js";

export function draw(p) {
  return p.vstripes([C.sky, C.white, C.sky]).miniSeal(16, 9, C.green);
}
