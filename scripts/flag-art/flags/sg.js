import { C } from "../palette.js";

export function draw(p) {
  return p
    .hstripes([C.red, C.white])
    .crescent(8, 5, 3, C.white, C.red)
    .star(13, 3, 1.2, 0.5, C.white, -90)
    .star(16, 5, 1.2, 0.5, C.white, -90)
    .star(13, 7, 1.2, 0.5, C.white, -90);
}
