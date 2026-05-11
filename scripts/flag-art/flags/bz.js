import { C } from "../palette.js";

export function draw(p) {
  return p
    .bg(C.blue)
    .rect(0, 0, 32, 2, C.red)
    .rect(0, 16, 32, 2, C.red)
    .disk(16, 9, 5, C.white)
    .miniSeal(16, 9, C.green);
}
