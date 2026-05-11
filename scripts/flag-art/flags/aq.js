import { C } from "../palette.js";

export function draw(p) {
  p.bg(C.sky);
  p.poly(
    [
      [16, 3],
      [24, 10],
      [21, 15],
      [12, 15],
      [8, 10],
    ],
    C.white
  );
  p.poly(
    [
      [13, 8],
      [19, 8],
      [17, 12],
      [12, 12],
    ],
    C.sky
  );
}
