import { C } from "./palette.js";
import {
  drawAe,
  drawBj,
  drawBh,
  drawBs,
  drawBw,
  drawCh,
  drawCl,
  drawCu,
  drawCz,
  drawDo,
  drawGb,
  drawGr,
  drawJo,
  drawPa,
  drawPk,
  drawPs,
  drawQa,
  drawSd,
  drawTr,
  drawAg,
  drawBa,
  drawBi,
  drawBn,
  drawBr,
  drawBt,
  drawBy,
  drawCd,
  drawCf,
  drawCv,
  drawDj,
  drawDm,
  drawEr,
  drawGd,
  drawGe,
  drawGq,
  drawGy,
  drawJm,
  drawKe,
  drawKi,
  drawKm,
  drawKn,
  drawKr,
  drawLc,
  drawLk,
  drawLr,
  drawMh,
  drawMk,
  drawMy,
  drawMz,
  drawNa,
  drawNp,
  drawPg,
  drawPh,
  drawSb,
  drawSc,
  drawSs,
  drawSx,
  drawSz,
  drawTg,
  drawTz,
  drawUs,
  drawVu,
  drawZa,
  drawZw,
  drawAi,
  drawAq,
  drawAs,
  drawBm,
  drawCc,
  drawCx,
  drawIo,
  drawPm,
  drawPr,
  drawTf,
  drawVi,
} from "./detailed-flags.js";

export const flags = {
  ae: drawAe,
  am: (p) => p.hstripes([C.deepRed, C.blue, C.orange]),
  ar: (p) => p.hstripes([C.sky, C.white, C.sky]).disk(16, 9, 2, C.yellow),
  at: (p) => p.hstripes([C.red, C.white, C.red]),
  bd: (p) => p.bg(C.darkGreen).disk(14, 9, 5, C.red),
  be: (p) => p.vstripes([C.black, C.yellow, C.red]),
  bg: (p) => p.hstripes([C.white, C.green, C.red]),
  bf: (p) =>
    p.rect(0, 0, 32, 9, C.red).rect(0, 9, 32, 9, C.green).star(16, 9, 4, 1.7, C.yellow, -90),
  bh: drawBh,
  bj: drawBj,
  bo: (p) => p.hstripes([C.red, C.yellow, C.green]),
  bs: drawBs,
  bw: drawBw,
  ch: drawCh,
  cl: drawCl,
  cm: (p) => p.vstripes([C.green, C.red, C.yellow]).star(16, 9, 3.5, 1.5, C.yellow, -90),
  co: (p) => p.rect(0, 0, 32, 9, C.yellow).rect(0, 9, 32, 4, C.blue).rect(0, 13, 32, 5, C.red),
  cr: (p) =>
    p
      .rect(0, 0, 32, 3, C.blue)
      .rect(0, 3, 32, 3, C.white)
      .rect(0, 6, 32, 6, C.red)
      .rect(0, 12, 32, 3, C.white)
      .rect(0, 15, 32, 3, C.blue),
  ci: (p) => p.vstripes([C.orange, C.white, C.green]),
  cu: drawCu,
  cz: drawCz,
  de: (p) => p.hstripes([C.black, C.red, C.gold]),
  dk: (p) => p.bg(C.red).cross(C.white, 10, 7, 4, 4),
  do: drawDo,
  ee: (p) => p.hstripes([C.blue, C.black, C.white]),
  fi: (p) => p.bg(C.white).cross(C.blue, 10, 7, 4, 4),
  fr: (p) => p.vstripes([C.blue, C.white, C.red]),
  ga: (p) => p.hstripes([C.green, C.yellow, C.blue]),
  gb: drawGb,
  gn: (p) => p.vstripes([C.red, C.yellow, C.green]),
  gr: drawGr,
  gh: (p) => p.hstripes([C.red, C.yellow, C.green]).star(16, 9, 3.4, 1.4, C.black, -90),
  hu: (p) => p.hstripes([C.red, C.white, C.green]),
  id: (p) => p.hstripes([C.red, C.white]),
  ie: (p) => p.vstripes([C.green, C.white, C.orange]),
  is: (p) => p.bg(C.blue).cross(C.white, 8, 6, 7, 6).cross(C.red, 10, 8, 3, 2),
  it: (p) => p.vstripes([C.green, C.white, C.red]),
  jp: (p) => p.bg(C.white).disk(16, 9, 5, C.red),
  jo: drawJo,
  la: (p) =>
    p
      .rect(0, 0, 32, 4, C.red)
      .rect(0, 4, 32, 10, C.blue)
      .rect(0, 14, 32, 4, C.red)
      .disk(16, 9, 4, C.white),
  lt: (p) => p.hstripes([C.yellow, C.green, C.red]),
  lu: (p) => p.hstripes([C.red, C.white, C.lightBlue]),
  lv: (p) =>
    p.rect(0, 0, 32, 7, C.deepRed).rect(0, 7, 32, 4, C.white).rect(0, 11, 32, 7, C.deepRed),
  mc: (p) => p.hstripes([C.red, C.white]),
  ml: (p) => p.vstripes([C.green, C.yellow, C.red]),
  ma: (p) => p.bg(C.red).star(16, 9, 4.8, 2, C.green, -90),
  ng: (p) => p.vstripes([C.green, C.white, C.green]),
  nl: (p) => p.hstripes([C.red, C.white, C.blue]),
  no: (p) => p.bg(C.red).cross(C.white, 8, 6, 7, 6).cross(C.blue, 10, 8, 3, 2),
  pa: drawPa,
  pk: drawPk,
  pl: (p) => p.hstripes([C.white, C.red]),
  ps: drawPs,
  pw: (p) => p.bg(C.sky).disk(14, 9, 5, C.yellow),
  qa: drawQa,
  ro: (p) => p.vstripes([C.blue, C.yellow, C.red]),
  ru: (p) => p.hstripes([C.white, C.blue, C.red]),
  se: (p) => p.bg(C.blue).cross(C.yellow, 10, 7, 4, 4),
  sl: (p) => p.hstripes([C.green, C.white, C.blue]),
  sn: (p) => p.vstripes([C.green, C.yellow, C.red]).star(16, 9, 3.4, 1.4, C.green, -90),
  so: (p) => p.bg(C.sky).star(16, 9, 5, 2.2, C.white, -90),
  sd: drawSd,
  sy: (p) =>
    p
      .hstripes([C.red, C.white, C.black])
      .star(13, 9, 2.2, 0.9, C.green, -90)
      .star(19, 9, 2.2, 0.9, C.green, -90),
  td: (p) => p.vstripes([C.blue, C.yellow, C.red]),
  th: (p) =>
    p
      .rect(0, 0, 32, 3, C.red)
      .rect(0, 3, 32, 3, C.white)
      .rect(0, 6, 32, 6, C.blue)
      .rect(0, 12, 32, 3, C.white)
      .rect(0, 15, 32, 3, C.red),
  tr: drawTr,
  ua: (p) => p.hstripes([C.blue, C.yellow]),
  vn: (p) => p.bg(C.red).star(16, 9, 5.5, 2.2, C.yellow, -90),
  ye: (p) => p.hstripes([C.red, C.white, C.black]),
};

Object.assign(flags, {
  ad: (p) => p.vstripes([C.blue, C.yellow, C.red]).miniSeal(16, 9, C.brown),
  af: (p) => p.vstripes([C.black, C.red, C.green]).miniSeal(16, 9, C.white),
  ag: drawAg,
  al: (p) => p.bg(C.red).eagle(16, 9, C.black),
  ao: (p) => p.hstripes([C.red, C.black]).gear(16, 9, C.yellow),
  au: (p) => p.bg(C.blue).unionCanton().southernCross(C.white, false),
  aw: (p) =>
    p
      .bg(C.sky)
      .rect(0, 12, 32, 2, C.yellow)
      .rect(0, 15, 32, 2, C.yellow)
      .star(7, 5, 3.5, 1.3, C.red, -90),
  ax: (p) => p.bg(C.blue).cross(C.yellow, 9, 6, 7, 6).cross(C.red, 11, 8, 3, 2),
  az: (p) =>
    p
      .hstripes([C.sky, C.red, C.green])
      .crescent(14, 9, 4, C.white, C.red)
      .star(20, 9, 2.4, 1, C.white, -90),
  ba: drawBa,
  bb: (p) => p.vstripes([C.blue, C.yellow, C.blue]).trident(16, 9, C.black),
  bi: drawBi,
  bn: drawBn,
  br: drawBr,
  bt: drawBt,
  by: drawBy,
  bz: (p) =>
    p
      .bg(C.blue)
      .rect(0, 0, 32, 2, C.red)
      .rect(0, 16, 32, 2, C.red)
      .disk(16, 9, 5, C.white)
      .miniSeal(16, 9, C.green),
  ca: (p) =>
    p
      .rect(0, 0, 8, 18, C.red)
      .rect(8, 0, 16, 18, C.white)
      .rect(24, 0, 8, 18, C.red)
      .maple(16, 9, C.red),
  cd: drawCd,
  cf: drawCf,
  cg: (p) =>
    p
      .bg(C.yellow)
      .poly(
        [
          [0, 0],
          [20, 0],
          [0, 18],
        ],
        C.green
      )
      .poly(
        [
          [32, 0],
          [12, 18],
          [32, 18],
        ],
        C.red
      ),
  ck: (p) => p.bg(C.blue).unionCanton().starRing(23, 9, C.white),
  cn: (p) =>
    p
      .bg(C.red)
      .star(7, 6, 4, 1.5, C.yellow, -90)
      .star(14, 3, 1.7, 0.7, C.yellow, -90)
      .star(17, 6, 1.7, 0.7, C.yellow, -90)
      .star(17, 10, 1.7, 0.7, C.yellow, -90)
      .star(14, 13, 1.7, 0.7, C.yellow, -90),
  cv: drawCv,
  cw: (p) =>
    p
      .bg(C.blue)
      .rect(0, 12, 32, 2, C.yellow)
      .star(7, 5, 2.5, 1, C.white, -90)
      .star(11, 7, 2, 0.8, C.white, -90),
  cy: (p) =>
    p
      .bg(C.white)
      .poly(
        [
          [13, 8],
          [19, 6],
          [24, 9],
          [18, 11],
        ],
        C.orange
      )
      .rect(13, 13, 8, 1, C.green)
      .rect(16, 12, 8, 1, C.green),
  dj: drawDj,
  dm: drawDm,
  dz: (p) =>
    p
      .rect(0, 0, 16, 18, C.green)
      .rect(16, 0, 16, 18, C.white)
      .crescent(16, 9, 5, C.red, C.white)
      .star(20, 9, 3, 1.2, C.red, -90),
  ec: (p) =>
    p
      .rect(0, 0, 32, 9, C.yellow)
      .rect(0, 9, 32, 4, C.blue)
      .rect(0, 13, 32, 5, C.red)
      .miniSeal(16, 9, C.brown),
  eg: (p) => p.hstripes([C.red, C.white, C.black]).miniSeal(16, 9, C.gold),
  er: drawEr,
  es: (p) =>
    p
      .rect(0, 0, 32, 5, C.red)
      .rect(0, 5, 32, 8, C.yellow)
      .rect(0, 13, 32, 5, C.red)
      .miniSeal(10, 9, C.brown),
  et: (p) =>
    p
      .hstripes([C.green, C.yellow, C.red])
      .disk(16, 9, 4, C.blue)
      .star(16, 9, 3.3, 1.2, C.yellow, -90),
  fj: (p) =>
    p
      .bg(C.sky)
      .unionCanton()
      .rect(24, 6, 4, 6, C.white)
      .rect(25, 7, 2, 2, C.red)
      .rect(25, 10, 2, 1, C.red),
  fm: (p) =>
    p
      .bg(C.sky)
      .star(16, 4, 2.3, 0.9, C.white, -90)
      .star(16, 14, 2.3, 0.9, C.white, -90)
      .star(10, 9, 2.3, 0.9, C.white, -90)
      .star(22, 9, 2.3, 0.9, C.white, -90),
  fo: (p) => p.bg(C.white).cross(C.red, 10, 7, 5, 4).cross(C.blue, 12, 8, 2, 2),
  gd: drawGd,
  ge: drawGe,
  gg: (p) => p.bg(C.white).cross(C.red, 14, 7, 4, 4).cross(C.yellow, 15, 8, 2, 2),
  gl: (p) =>
    p
      .rect(0, 0, 32, 9, C.white)
      .rect(0, 9, 32, 9, C.red)
      .rect(11, 5, 10, 4, C.red)
      .rect(11, 9, 10, 4, C.white),
  gm: (p) =>
    p
      .rect(0, 0, 32, 5, C.red)
      .rect(0, 6, 32, 6, C.blue)
      .rect(0, 13, 32, 5, C.green)
      .rect(0, 5, 32, 1, C.white)
      .rect(0, 12, 32, 1, C.white),
  gq: drawGq,
  gt: (p) => p.vstripes([C.sky, C.white, C.sky]).miniSeal(16, 9, C.green),
  gw: (p) =>
    p
      .rect(0, 0, 11, 18, C.red)
      .rect(11, 0, 21, 9, C.yellow)
      .rect(11, 9, 21, 9, C.green)
      .star(5.5, 9, 3.4, 1.4, C.black, -90),
  gy: drawGy,
  hk: (p) => p.bg(C.red).flower(16, 9, C.white),
  hn: (p) => p.hstripes([C.sky, C.white, C.sky]).fiveStars(C.sky),
  hr: (p) => p.hstripes([C.red, C.white, C.blue]).checker(16, 8),
  ht: (p) => p.hstripes([C.blue, C.red]).rect(13, 7, 6, 4, C.white).miniSeal(16, 9, C.green),
  il: (p) =>
    p
      .bg(C.white)
      .rect(0, 2, 32, 2, C.blue)
      .rect(0, 14, 32, 2, C.blue)
      .star(16, 9, 4, 2, C.blue, -90),
  im: (p) => p.bg(C.red).triskelion(16, 9, C.yellow),
  in: (p) => p.hstripes([C.orange, C.white, C.green]).wheel(16, 9, C.blue),
  iq: (p) =>
    p
      .hstripes([C.red, C.white, C.black])
      .rect(12, 8, 8, 2, C.green)
      .rect(14, 6, 1, 5, C.green)
      .rect(18, 6, 1, 5, C.green),
  ir: (p) =>
    p
      .hstripes([C.green, C.white, C.red])
      .miniSeal(16, 9, C.red)
      .rect(0, 5, 32, 1, C.white)
      .rect(0, 12, 32, 1, C.white),
  je: (p) =>
    p
      .bg(C.white)
      .poly(
        [
          [0, 0],
          [3, 0],
          [32, 16],
          [32, 18],
          [29, 18],
          [0, 2],
        ],
        C.red
      )
      .poly(
        [
          [32, 0],
          [29, 0],
          [0, 16],
          [0, 18],
          [3, 18],
          [32, 2],
        ],
        C.red
      )
      .rect(15, 2, 2, 3, C.yellow),
  jm: drawJm,
  ke: drawKe,
  kg: (p) => p.bg(C.red).disk(16, 9, 5, C.yellow).rect(12, 8, 8, 2, C.red).rect(15, 5, 2, 8, C.red),
  kh: (p) =>
    p
      .rect(0, 0, 32, 4, C.blue)
      .rect(0, 4, 32, 10, C.red)
      .rect(0, 14, 32, 4, C.blue)
      .temple(16, 10, C.white),
  ki: drawKi,
  km: drawKm,
  kn: drawKn,
  kp: (p) =>
    p
      .rect(0, 0, 32, 3, C.blue)
      .rect(0, 3, 32, 2, C.white)
      .rect(0, 5, 32, 8, C.red)
      .rect(0, 13, 32, 2, C.white)
      .rect(0, 15, 32, 3, C.blue)
      .disk(10, 9, 4, C.white)
      .star(10, 9, 3, 1.2, C.red, -90),
  kr: drawKr,
  kw: (p) =>
    p.hstripes([C.green, C.white, C.red]).poly(
      [
        [0, 0],
        [9, 5],
        [9, 13],
        [0, 18],
      ],
      C.black
    ),
  kz: (p) =>
    p.bg(C.sky).rect(0, 0, 3, 18, C.yellow).disk(17, 7, 3, C.yellow).eagle(17, 12, C.yellow),
  lb: (p) =>
    p
      .rect(0, 0, 32, 5, C.red)
      .rect(0, 5, 32, 8, C.white)
      .rect(0, 13, 32, 5, C.red)
      .cedar(16, 9, C.green),
  lc: drawLc,
  li: (p) =>
    p
      .hstripes([C.blue, C.red])
      .rect(6, 4, 5, 2, C.yellow)
      .rect(7, 2, 3, 2, C.yellow)
      .rect(5, 6, 7, 2, C.yellow),
  lk: drawLk,
  lr: drawLr,
  ls: (p) => p.hstripes([C.blue, C.white, C.green]).hat(16, 9, C.black),
  ly: (p) =>
    p
      .rect(0, 0, 32, 5, C.red)
      .rect(0, 5, 32, 8, C.black)
      .rect(0, 13, 32, 5, C.green)
      .crescent(15, 9, 4, C.white, C.black)
      .star(20, 9, 2.5, 1, C.white, -90),
  md: (p) => p.vstripes([C.blue, C.yellow, C.red]).miniSeal(16, 9, C.brown),
  me: (p) =>
    p
      .bg(C.red)
      .rect(0, 0, 32, 2, C.yellow)
      .rect(0, 16, 32, 2, C.yellow)
      .rect(0, 0, 2, 18, C.yellow)
      .rect(30, 0, 2, 18, C.yellow)
      .eagle(16, 9, C.yellow),
  mf: (p) => p.vstripes([C.blue, C.white, C.red]),
  mg: (p) => p.rect(0, 0, 11, 18, C.white).rect(11, 0, 21, 9, C.red).rect(11, 9, 21, 9, C.green),
  mh: drawMh,
  mk: drawMk,
  mm: (p) => p.hstripes([C.yellow, C.green, C.red]).star(16, 9, 5, 2.1, C.white, -90),
  mn: (p) => p.vstripes([C.red, C.blue, C.red]).rect(3, 5, 4, 8, C.yellow),
  mr: (p) =>
    p
      .rect(0, 0, 32, 4, C.red)
      .rect(0, 4, 32, 10, C.green)
      .rect(0, 14, 32, 4, C.red)
      .crescent(16, 10, 4, C.yellow, C.green)
      .star(16, 7, 2.5, 1, C.yellow, -90),
  mt: (p) =>
    p
      .rect(0, 0, 16, 18, C.white)
      .rect(16, 0, 16, 18, C.red)
      .rect(3, 3, 4, 1, C.gray)
      .rect(4, 2, 1, 4, C.gray),
  mu: (p) =>
    p
      .rect(0, 0, 32, 5, C.red)
      .rect(0, 5, 32, 4, C.blue)
      .rect(0, 9, 32, 4, C.yellow)
      .rect(0, 13, 32, 5, C.green),
  mv: (p) => p.bg(C.red).rect(7, 4, 18, 10, C.green).crescent(17, 9, 4, C.white, C.green),
  mw: (p) => p.hstripes([C.black, C.red, C.green]).sunrise(16, 5, C.red),
  mx: (p) => p.vstripes([C.green, C.white, C.red]).miniSeal(16, 9, C.brown),
  my: drawMy,
  mz: drawMz,
  na: drawNa,
  ne: (p) => p.hstripes([C.orange, C.white, C.green]).disk(16, 9, 3, C.orange),
  ni: (p) => p.hstripes([C.blue, C.white, C.blue]).miniSeal(16, 9, C.yellow),
  np: drawNp,
  nr: (p) => p.bg(C.blue).rect(0, 9, 32, 2, C.yellow).star(9, 13, 3, 1.2, C.white, -90),
  nu: (p) =>
    p
      .bg(C.yellow)
      .unionCanton()
      .star(22, 8, 2.2, 0.9, C.blue, -90)
      .star(27, 5, 1.6, 0.7, C.blue, -90)
      .star(28, 12, 1.6, 0.7, C.blue, -90),
  nz: (p) => p.bg(C.blue).unionCanton().southernCross(C.red, true),
  om: (p) =>
    p
      .rect(0, 0, 8, 18, C.red)
      .rect(8, 0, 24, 6, C.white)
      .rect(8, 6, 24, 6, C.red)
      .rect(8, 12, 24, 6, C.green)
      .rect(2, 3, 3, 4, C.white),
  pe: (p) => p.vstripes([C.red, C.white, C.red]),
  pf: (p) =>
    p
      .rect(0, 0, 32, 5, C.red)
      .rect(0, 5, 32, 8, C.white)
      .rect(0, 13, 32, 5, C.red)
      .disk(16, 9, 4, C.orange)
      .rect(12, 9, 8, 1, C.blue),
  pg: drawPg,
  ph: drawPh,
  pt: (p) => p.rect(0, 0, 13, 18, C.green).rect(13, 0, 19, 18, C.red).miniSeal(13, 9, C.yellow),
  py: (p) => p.hstripes([C.red, C.white, C.blue]).miniSeal(16, 9, C.green),
  rs: (p) => p.hstripes([C.red, C.blue, C.white]).miniSeal(11, 9, C.yellow),
  rw: (p) =>
    p
      .rect(0, 0, 32, 9, C.sky)
      .rect(0, 9, 32, 4, C.yellow)
      .rect(0, 13, 32, 5, C.green)
      .sun(25, 5, C.yellow),
  sa: (p) =>
    p
      .bg(C.darkGreen)
      .rect(8, 6, 16, 2, C.white)
      .rect(10, 10, 12, 1, C.white)
      .rect(22, 9, 4, 1, C.white),
  sb: drawSb,
  sc: drawSc,
  sg: (p) =>
    p
      .hstripes([C.red, C.white])
      .crescent(8, 5, 3, C.white, C.red)
      .star(13, 3, 1.2, 0.5, C.white, -90)
      .star(16, 5, 1.2, 0.5, C.white, -90)
      .star(13, 7, 1.2, 0.5, C.white, -90),
  si: (p) => p.hstripes([C.white, C.blue, C.red]).miniSeal(8, 6, C.sky),
  sk: (p) => p.hstripes([C.white, C.blue, C.red]).miniSeal(9, 8, C.red),
  sm: (p) => p.hstripes([C.white, C.sky]).miniSeal(16, 9, C.yellow),
  sr: (p) =>
    p
      .rect(0, 0, 32, 4, C.green)
      .rect(0, 4, 32, 2, C.white)
      .rect(0, 6, 32, 6, C.red)
      .rect(0, 12, 32, 2, C.white)
      .rect(0, 14, 32, 4, C.green)
      .star(16, 9, 4, 1.7, C.yellow, -90),
  ss: drawSs,
  st: (p) =>
    p
      .hstripes([C.green, C.yellow, C.green])
      .poly(
        [
          [0, 0],
          [12, 9],
          [0, 18],
        ],
        C.red
      )
      .star(16, 9, 2.5, 1, C.black, -90)
      .star(22, 9, 2.5, 1, C.black, -90),
  sv: (p) => p.hstripes([C.blue, C.white, C.blue]).miniSeal(16, 9, C.yellow),
  sx: drawSx,
  sz: drawSz,
  tg: drawTg,
  tj: (p) =>
    p
      .rect(0, 0, 32, 5, C.red)
      .rect(0, 5, 32, 8, C.white)
      .rect(0, 13, 32, 5, C.green)
      .crown(16, 9, C.yellow),
  tk: (p) =>
    p
      .bg(C.sky)
      .rect(0, 0, 9, 18, C.red)
      .crescent(15, 6, 3, C.white, C.sky)
      .star(22, 5, 1.4, 0.6, C.white, -90)
      .star(24, 9, 1.4, 0.6, C.white, -90)
      .star(20, 12, 1.4, 0.6, C.white, -90),
  tl: (p) =>
    p
      .bg(C.red)
      .poly(
        [
          [0, 0],
          [18, 9],
          [0, 18],
        ],
        C.yellow
      )
      .poly(
        [
          [0, 0],
          [11, 9],
          [0, 18],
        ],
        C.black
      )
      .star(4, 9, 2.5, 1, C.white, -90),
  tm: (p) =>
    p
      .bg(C.green)
      .rect(3, 0, 5, 18, C.red)
      .crescent(17, 5, 3, C.white, C.green)
      .star(23, 3, 1.1, 0.5, C.white, -90)
      .star(24, 7, 1.1, 0.5, C.white, -90)
      .star(21, 10, 1.1, 0.5, C.white, -90),
  tn: (p) =>
    p
      .bg(C.red)
      .disk(16, 9, 5, C.white)
      .crescent(15, 9, 3, C.red, C.white)
      .star(19, 9, 2.2, 0.9, C.red, -90),
  to: (p) => p.bg(C.red).rect(0, 0, 13, 9, C.white).rect(5, 2, 3, 5, C.red).rect(3, 4, 7, 2, C.red),
  tt: (p) =>
    p
      .bg(C.red)
      .poly(
        [
          [0, 0],
          [5, 0],
          [32, 15],
          [32, 18],
          [27, 18],
          [0, 3],
        ],
        C.white
      )
      .poly(
        [
          [2, 0],
          [7, 0],
          [32, 14],
          [32, 18],
          [25, 18],
          [0, 4],
          [0, 0],
        ],
        C.black
      ),
  tv: (p) =>
    p
      .bg(C.sky)
      .unionCanton()
      .star(23, 5, 1.8, 0.7, C.yellow, -90)
      .star(27, 9, 1.8, 0.7, C.yellow, -90)
      .star(21, 13, 1.8, 0.7, C.yellow, -90),
  tw: (p) => p.bg(C.red).rect(0, 0, 14, 9, C.blue).sun(7, 4.5, C.white),
  tz: drawTz,
  ug: (p) =>
    p
      .rect(0, 0, 32, 3, C.black)
      .rect(0, 3, 32, 3, C.yellow)
      .rect(0, 6, 32, 3, C.red)
      .rect(0, 9, 32, 3, C.black)
      .rect(0, 12, 32, 3, C.yellow)
      .rect(0, 15, 32, 3, C.red)
      .disk(16, 9, 3, C.white),
  us: drawUs,
  uy: (p) =>
    p
      .bg(C.white)
      .rect(0, 2, 32, 2, C.blue)
      .rect(0, 6, 32, 2, C.blue)
      .rect(0, 10, 32, 2, C.blue)
      .rect(0, 14, 32, 2, C.blue)
      .rect(0, 0, 11, 9, C.white)
      .sun(5.5, 4.5, C.yellow),
  uz: (p) =>
    p
      .rect(0, 0, 32, 5, C.sky)
      .rect(0, 6, 32, 1, C.red)
      .rect(0, 7, 32, 4, C.white)
      .rect(0, 11, 32, 1, C.red)
      .rect(0, 12, 32, 6, C.green)
      .crescent(7, 3, 2.5, C.white, C.sky)
      .star(13, 2, 1, 0.4, C.white, -90)
      .star(17, 3, 1, 0.4, C.white, -90),
  va: (p) => p.rect(0, 0, 16, 18, C.yellow).rect(16, 0, 16, 18, C.white).miniSeal(23, 9, C.yellow),
  vc: (p) =>
    p
      .rect(0, 0, 8, 18, C.blue)
      .rect(8, 0, 16, 18, C.yellow)
      .rect(24, 0, 8, 18, C.green)
      .diamond(16, 7, C.green)
      .diamond(13, 11, C.green)
      .diamond(19, 11, C.green),
  ve: (p) => p.hstripes([C.yellow, C.blue, C.red]).starArc(16, 9, C.white),
  vu: drawVu,
  ws: (p) =>
    p
      .bg(C.red)
      .rect(0, 0, 15, 9, C.blue)
      .star(6, 3, 1.5, 0.6, C.white, -90)
      .star(10, 5, 1.5, 0.6, C.white, -90)
      .star(5, 7, 1.5, 0.6, C.white, -90),
  xk: (p) =>
    p
      .bg(C.blue)
      .poly(
        [
          [13, 8],
          [20, 7],
          [23, 10],
          [18, 13],
          [12, 12],
        ],
        C.yellow
      )
      .starArc(16, 5, C.white),
  za: drawZa,
  zm: (p) =>
    p
      .bg(C.green)
      .rect(24, 10, 3, 8, C.red)
      .rect(27, 10, 3, 8, C.black)
      .rect(30, 10, 2, 8, C.orange)
      .eagle(27, 7, C.orange),
  zw: drawZw,
  ai: drawAi,
  aq: drawAq,
  as: drawAs,
  bl: (p) => p.vstripes([C.blue, C.white, C.red]),
  bm: drawBm,
  bq: (p) => p.hstripes([C.red, C.white, C.blue]).star(16, 9, 3, 1.2, C.yellow, -90),
  bv: (p) => p.bg(C.red).cross(C.white, 8, 6, 7, 6).cross(C.blue, 10, 8, 3, 2),
  cc: drawCc,
  cx: drawCx,
  eh: (p) =>
    p
      .hstripes([C.black, C.white, C.green])
      .poly(
        [
          [0, 0],
          [13, 9],
          [0, 18],
        ],
        C.red
      )
      .crescent(16, 9, 3, C.red, C.white)
      .star(21, 9, 2.2, 0.9, C.red, -90),
  fk: (p) => p.bg(C.blue).unionCanton().miniSeal(25, 9, C.white),
  gf: (p) =>
    p
      .bg(C.green)
      .poly(
        [
          [0, 18],
          [32, 0],
          [32, 18],
        ],
        C.yellow
      )
      .star(16, 9, 3.4, 1.4, C.red, -90),
  gi: (p) =>
    p
      .rect(0, 0, 32, 12, C.white)
      .rect(0, 12, 32, 6, C.red)
      .rect(11, 5, 10, 5, C.red)
      .rect(13, 3, 2, 2, C.red)
      .rect(17, 3, 2, 2, C.red)
      .rect(15, 10, 2, 5, C.yellow),
  gp: (p) =>
    p
      .bg(C.black)
      .rect(0, 0, 32, 5, C.blue)
      .sun(16, 8, C.yellow)
      .rect(9, 12, 2, 4, C.green)
      .rect(15, 12, 2, 4, C.green)
      .rect(21, 12, 2, 4, C.green),
  gs: (p) => p.bg(C.blue).unionCanton().miniSeal(25, 9, C.white),
  gu: (p) =>
    p
      .bg(C.blue)
      .rect(0, 0, 32, 2, C.red)
      .rect(0, 16, 32, 2, C.red)
      .rect(0, 0, 2, 18, C.red)
      .rect(30, 0, 2, 18, C.red)
      .diamond(16, 9, C.white)
      .rect(14, 8, 4, 2, C.sky),
  hm: (p) => p.bg(C.blue).unionCanton().southernCross(C.white, false),
  io: drawIo,
  ky: (p) => p.bg(C.blue).unionCanton().miniSeal(25, 9, C.white),
  mo: (p) =>
    p
      .bg(C.green)
      .flower(16, 10, C.white)
      .star(16, 3, 1.6, 0.7, C.yellow, -90)
      .star(12, 5, 1.2, 0.5, C.yellow, -90)
      .star(20, 5, 1.2, 0.5, C.yellow, -90),
  mp: (p) =>
    p
      .bg(C.blue)
      .star(16, 9, 5, 2, C.white, -90)
      .rect(15, 6, 2, 7, C.gray)
      .rect(13, 11, 6, 2, C.gray),
  mq: (p) =>
    p
      .bg(C.green)
      .poly(
        [
          [0, 0],
          [32, 0],
          [0, 18],
        ],
        C.red
      )
      .poly(
        [
          [32, 0],
          [0, 18],
          [32, 18],
        ],
        C.black
      ),
  ms: (p) => p.bg(C.blue).unionCanton().miniSeal(25, 9, C.white),
  nc: (p) =>
    p
      .hstripes([C.blue, C.red, C.green])
      .disk(10, 9, 5, C.yellow)
      .rect(9, 5, 2, 8, C.black)
      .rect(7, 7, 6, 1, C.black),
  nf: (p) => p.vstripes([C.green, C.white, C.green]).cedar(16, 9, C.green),
  pm: drawPm,
  pn: (p) => p.bg(C.blue).unionCanton().miniSeal(25, 9, C.white),
  pr: drawPr,
  re: (p) =>
    p
      .bg(C.blue)
      .poly(
        [
          [16, 4],
          [29, 18],
          [3, 18],
        ],
        C.red
      )
      .poly(
        [
          [16, 1],
          [20, 18],
          [12, 18],
        ],
        C.yellow
      )
      .poly(
        [
          [8, 3],
          [18, 18],
          [14, 18],
        ],
        C.yellow
      )
      .poly(
        [
          [24, 3],
          [18, 18],
          [14, 18],
        ],
        C.yellow
      ),
  sh: (p) => p.bg(C.blue).unionCanton().miniSeal(25, 9, C.white),
  sj: (p) => p.bg(C.red).cross(C.white, 8, 6, 7, 6).cross(C.blue, 10, 8, 3, 2),
  tc: (p) => p.bg(C.blue).unionCanton().miniSeal(25, 9, C.yellow),
  tf: drawTf,
  um: drawUs,
  vg: (p) => p.bg(C.blue).unionCanton().miniSeal(25, 9, C.green),
  vi: drawVi,
  wf: (p) =>
    p.bg(C.red).rect(0, 0, 4, 8, C.blue).rect(4, 0, 4, 8, C.white).rect(22, 6, 5, 5, C.white),
  yt: (p) => p.vstripes([C.blue, C.white, C.red]),
});
