import { C } from "../palette.js";

export function draw(p) {
  return p
    .hstripes([C.green, C.yellow, C.red])
    .disk(16, 9, 4, C.blue)
    .star(16, 9, 3.3, 1.2, C.yellow, -90);
}
