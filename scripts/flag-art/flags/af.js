import { C } from "../palette.js";

export function draw(p) {
  return p.vstripes([C.black, C.red, C.green]).miniSeal(16, 9, C.white);
}
