import { C } from "../palette.js";

export function draw(p) {
  p.bg(C.green);
  p.disk(7, 5, 3, C.yellow);
  p.rect(6, 5, 2, 6, C.green);
  p.crescent(18, 9, 3, C.white, C.green);
  p.southernCross(C.white, false);
}
