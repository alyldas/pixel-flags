import { C } from "../palette.js";

export function draw(p) {
  return p
    .hstripes([C.green, C.white, C.red])
    .miniSeal(16, 9, C.red)
    .rect(0, 5, 32, 1, C.white)
    .rect(0, 12, 32, 1, C.white);
}
