import { C } from "../palette.js";

export function draw(p) {
  return p.bg(C.blue).unionCanton().southernCross(C.white, false);
}
