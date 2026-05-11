import { C } from "../palette.js";

export function draw(p) {
  return p.hstripes([C.blue, C.white, C.green]).hat(16, 9, C.black);
}
