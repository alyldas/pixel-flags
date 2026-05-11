import { C } from "../palette.js";

export function draw(p) {
  return p.rect(0, 0, 32, 9, C.red).rect(0, 9, 32, 9, C.green).star(16, 9, 4, 1.7, C.yellow, -90);
}
