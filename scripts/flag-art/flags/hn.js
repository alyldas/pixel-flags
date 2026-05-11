import { C } from "../palette.js";

export function draw(p) {
  return p.hstripes([C.sky, C.white, C.sky]).fiveStars(C.sky);
}
