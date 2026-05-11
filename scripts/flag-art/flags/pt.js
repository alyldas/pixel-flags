import { C } from "../palette.js";

export function draw(p) {
  return p.rect(0, 0, 13, 18, C.green).rect(13, 0, 19, 18, C.red).miniSeal(13, 9, C.yellow);
}
