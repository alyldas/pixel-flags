import { C } from "../palette.js";

export function draw(p) {
  p.bg(C.white);
  for (let y = 2; y < 18; y += 4) {
    p.rect(0, y, 32, 2, C.blue);
  }
  p.unionCanton();
  p.rect(24, 8, 2, 7, C.green);
  p.rect(21, 9, 8, 2, C.green);
  p.crown(25, 5, C.yellow);
}
