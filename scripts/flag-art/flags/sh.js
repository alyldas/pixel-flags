import { C } from "../palette.js";

export function draw(p) {
  return p.bg(C.blue).unionCanton().miniSeal(25, 9, C.white);
}
