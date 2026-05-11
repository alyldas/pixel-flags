import { C } from "../palette.js";

export function draw(p) {
  return p.vstripes([C.blue, C.yellow, C.blue]).trident(16, 9, C.black);
}
