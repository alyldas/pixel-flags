import { C } from "../palette.js";

export function draw(p) {
  return p.rect(0, 0, 11, 18, C.white).rect(11, 0, 21, 9, C.red).rect(11, 9, 21, 9, C.green);
}
