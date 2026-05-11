import { C } from "../palette.js";

export function draw(p) {
  p.rect(0, 0, 13, 18, C.green);
  p.rect(13, 0, 19, 9, C.yellow);
  p.rect(13, 9, 19, 9, C.red);
}
