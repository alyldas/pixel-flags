import { C } from "../palette.js";

export function draw(p) {
  p.bg(C.red);
  p.unionCanton();
  p.rect(23, 6, 6, 6, C.white);
  p.rect(24, 7, 4, 2, C.green);
  p.rect(24, 10, 4, 1, C.blue);
}
