import { C } from "../palette.js";

export function draw(p) {
  return p
    .hstripes([C.sky, C.red, C.green])
    .crescent(14, 9, 4, C.white, C.red)
    .star(20, 9, 2.4, 1, C.white, -90);
}
