import { C } from "../palette.js";

export function draw(p) {
  return p
    .hstripes([C.blue, C.red, C.green])
    .disk(10, 9, 5, C.yellow)
    .rect(9, 5, 2, 8, C.black)
    .rect(7, 7, 6, 1, C.black);
}
