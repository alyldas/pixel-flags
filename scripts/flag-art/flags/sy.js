import { C } from "../palette.js";

export function draw(p) {
  return p
    .hstripes([C.red, C.white, C.black])
    .star(13, 9, 2.2, 0.9, C.green, -90)
    .star(19, 9, 2.2, 0.9, C.green, -90);
}
