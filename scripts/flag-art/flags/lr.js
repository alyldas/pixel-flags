import { C } from "../palette.js";

export function draw(p) {
  p.bg(C.white);
  for (let stripe = 0; stripe < 11; stripe += 2) {
    const y = Math.floor((stripe * 18) / 11);
    const nextY = Math.floor(((stripe + 1) * 18) / 11);
    p.rect(0, y, 32, Math.max(1, nextY - y), C.red);
  }
  p.rect(0, 0, 13, 9, C.blue);
  p.star(6.5, 4.5, 3, 1.2, C.white, -90);
}
