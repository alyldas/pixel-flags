import { C } from "../palette.js";

export function draw(p) {
  return p.vstripes([C.green, C.white, C.red]).miniSeal(16, 9, C.brown);
}
