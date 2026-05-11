import { C } from "../palette.js";

export function draw(p) {
  return p.hstripes([C.sky, C.white, C.sky]).disk(16, 9, 2, C.yellow);
}
