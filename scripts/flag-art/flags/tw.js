import { C } from "../palette.js";

export function draw(p) {
  return p.bg(C.red).rect(0, 0, 14, 9, C.blue).sun(7, 4.5, C.white);
}
