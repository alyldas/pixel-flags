import { C } from "../palette.js";

export function draw(p) {
  return p.hstripes([C.orange, C.white, C.green]).disk(16, 9, 3, C.orange);
}
