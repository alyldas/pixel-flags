import { C } from "../palette.js";

export function draw(p) {
  return p.rect(0, 0, 32, 7, C.deepRed).rect(0, 7, 32, 4, C.white).rect(0, 11, 32, 7, C.deepRed);
}
