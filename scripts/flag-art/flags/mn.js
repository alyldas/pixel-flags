import { C } from "../palette.js";

export function draw(p) {
  return p.vstripes([C.red, C.blue, C.red]).rect(3, 5, 4, 8, C.yellow);
}
