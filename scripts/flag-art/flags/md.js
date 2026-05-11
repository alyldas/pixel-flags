import { C } from "../palette.js";

export function draw(p) {
  return p.vstripes([C.blue, C.yellow, C.red]).miniSeal(16, 9, C.brown);
}
