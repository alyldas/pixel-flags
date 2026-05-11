import { C } from "../palette.js";

export function draw(p) {
  p.bg(C.green);
  p.cross(C.yellow, 13, 7, 6, 4);
  p.cross(C.black, 14, 8, 4, 2);
  p.disk(16, 9, 4, C.red);
  p.starRing(16, 9, C.yellow, 2);
}
