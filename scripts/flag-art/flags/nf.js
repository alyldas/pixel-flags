import { C } from "../palette.js";

export function draw(p) {
  return p.vstripes([C.green, C.white, C.green]).cedar(16, 9, C.green);
}
