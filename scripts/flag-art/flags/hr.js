import { C } from "../palette.js";

export function draw(p) {
  return p.hstripes([C.red, C.white, C.blue]).checker(16, 8);
}
