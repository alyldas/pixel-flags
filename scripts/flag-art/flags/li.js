import { C } from "../palette.js";

export function draw(p) {
  return p
    .hstripes([C.blue, C.red])
    .rect(6, 4, 5, 2, C.yellow)
    .rect(7, 2, 3, 2, C.yellow)
    .rect(5, 6, 7, 2, C.yellow);
}
