import { C } from "../palette.js";

export function draw(p) {
  p.bg(C.blue);
  p.unionCanton();
  p.rect(22, 5, 7, 7, C.white);
  p.rect(23, 7, 5, 1, C.sky);
  p.rect(23, 9, 5, 1, C.sky);
  p.rect(24, 6, 3, 5, C.orange);
}
