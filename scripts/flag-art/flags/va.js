import { C } from "../palette.js";

export function draw(p) {
  return p.rect(0, 0, 16, 18, C.yellow).rect(16, 0, 16, 18, C.white).miniSeal(23, 9, C.yellow);
}
