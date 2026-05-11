import { C } from "../palette.js";

export function draw(p) {
  return p.bg(C.blue).unionCanton().starRing(23, 9, C.white);
}
