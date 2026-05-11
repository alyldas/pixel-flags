import { C } from "../palette.js";

export function draw(p) {
  return p.bg(C.red).rect(7, 4, 18, 10, C.green).crescent(17, 9, 4, C.white, C.green);
}
