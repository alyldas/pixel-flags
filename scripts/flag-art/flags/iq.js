import { C } from "../palette.js";

export function draw(p) {
  return p
    .hstripes([C.red, C.white, C.black])
    .rect(12, 8, 8, 2, C.green)
    .rect(14, 6, 1, 5, C.green)
    .rect(18, 6, 1, 5, C.green);
}
