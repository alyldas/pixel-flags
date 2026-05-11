import { C } from "../palette.js";

export function draw(p) {
  return p.hstripes([C.black, C.red, C.green]).sunrise(16, 5, C.red);
}
