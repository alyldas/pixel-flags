import { C } from "../palette.js";

export function draw(p) {
  p.bg(C.red);
  p.rect(4, 4, 12, 5, C.yellow);
  p.rect(16, 4, 12, 5, C.green);
  p.rect(4, 9, 12, 5, C.green);
  p.rect(16, 9, 12, 5, C.yellow);
  p.disk(16, 9, 3, C.red);
  p.star(16, 9, 2, 0.8, C.yellow, -90);
  for (const x of [8, 13, 19, 24]) p.star(x, 2, 1.5, 0.6, C.yellow, -90);
  for (const x of [8, 13, 19, 24]) p.star(x, 16, 1.5, 0.6, C.yellow, -90);
}
