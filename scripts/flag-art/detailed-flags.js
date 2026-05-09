import { C } from "./palette.js";

export function drawAe(p) {
  p.rect(0, 0, 8, 18, C.red);
  p.rect(8, 0, 24, 6, C.green);
  p.rect(8, 6, 24, 6, C.white);
  p.rect(8, 12, 24, 6, C.black);
}

export function drawBj(p) {
  p.rect(0, 0, 13, 18, C.green);
  p.rect(13, 0, 19, 9, C.yellow);
  p.rect(13, 9, 19, 9, C.red);
}

export function drawBh(p) {
  p.bg(C.red);
  p.rect(0, 0, 9, 18, C.white);
  for (let y = 0; y < 18; y += 4) {
    p.poly(
      [
        [9, y],
        [13, y + 2],
        [9, y + 4],
      ],
      C.white
    );
  }
}

export function drawBs(p) {
  p.rect(0, 0, 32, 6, C.aqua);
  p.rect(0, 6, 32, 6, C.yellow);
  p.rect(0, 12, 32, 6, C.aqua);
  p.poly(
    [
      [0, 0],
      [13, 9],
      [0, 18],
    ],
    C.black
  );
}

export function drawBw(p) {
  p.bg(C.sky);
  p.rect(0, 7, 32, 4, C.white);
  p.rect(0, 8, 32, 2, C.black);
}

export function drawCh(p) {
  p.bg(C.red);
  p.rect(14, 4, 4, 10, C.white);
  p.rect(10, 7, 12, 4, C.white);
}

export function drawCl(p) {
  p.rect(0, 0, 32, 9, C.white);
  p.rect(0, 9, 32, 9, C.red);
  p.rect(0, 0, 11, 9, C.blue);
  p.star(5.5, 4.5, 3, 1.25, C.white, -90);
}

export function drawCu(p) {
  p.rect(0, 0, 32, 18, C.white);
  for (const y of [0, 7, 14]) {
    p.rect(0, y, 32, 4, C.blue);
  }
  p.poly(
    [
      [0, 0],
      [14, 9],
      [0, 18],
    ],
    C.red
  );
  p.star(5, 9, 3, 1.2, C.white, -90);
}

export function drawCz(p) {
  p.rect(0, 0, 32, 9, C.white);
  p.rect(0, 9, 32, 9, C.red);
  p.poly(
    [
      [0, 0],
      [15, 9],
      [0, 18],
    ],
    C.blue
  );
}

export function drawDo(p) {
  p.rect(0, 0, 14, 7, C.blue);
  p.rect(18, 0, 14, 7, C.red);
  p.rect(0, 11, 14, 7, C.red);
  p.rect(18, 11, 14, 7, C.blue);
  p.rect(14, 0, 4, 18, C.white);
  p.rect(0, 7, 32, 4, C.white);
  p.rect(15, 8, 2, 2, C.green);
}

export function drawGb(p) {
  p.bg(C.blue);
  p.poly(
    [
      [0, 0],
      [4, 0],
      [32, 15],
      [32, 18],
      [28, 18],
      [0, 3],
    ],
    C.white
  );
  p.poly(
    [
      [32, 0],
      [28, 0],
      [0, 15],
      [0, 18],
      [4, 18],
      [32, 3],
    ],
    C.white
  );
  p.poly(
    [
      [0, 0],
      [2, 0],
      [32, 16],
      [32, 18],
      [30, 18],
      [0, 2],
    ],
    C.red
  );
  p.poly(
    [
      [32, 0],
      [30, 0],
      [0, 16],
      [0, 18],
      [2, 18],
      [32, 2],
    ],
    C.red
  );
  p.cross(C.white, 13, 6, 6, 6);
  p.cross(C.red, 15, 7, 2, 4);
}

export function drawGr(p) {
  p.rect(0, 0, 32, 18, C.white);
  for (const y of [0, 4, 8, 12, 16]) {
    p.rect(0, y, 32, 2, C.blue);
  }
  p.rect(0, 0, 12, 10, C.blue);
  p.rect(5, 0, 2, 10, C.white);
  p.rect(0, 4, 12, 2, C.white);
}

export function drawJo(p) {
  p.hstripes([C.black, C.white, C.green]);
  p.poly(
    [
      [0, 0],
      [14, 9],
      [0, 18],
    ],
    C.red
  );
  p.star(5, 9, 2, 0.8, C.white, -90);
}

export function drawPa(p) {
  p.rect(0, 0, 16, 9, C.white);
  p.rect(16, 0, 16, 9, C.red);
  p.rect(0, 9, 16, 9, C.blue);
  p.rect(16, 9, 16, 9, C.white);
  p.star(8, 4.5, 2.6, 1.1, C.blue, -90);
  p.star(24, 13.5, 2.6, 1.1, C.red, -90);
}

export function drawPk(p) {
  p.rect(0, 0, 8, 18, C.white);
  p.rect(8, 0, 24, 18, C.darkGreen);
  p.disk(19, 9, 5, C.white);
  p.disk(21, 8, 4, C.darkGreen);
  p.star(25, 7, 2.6, 1, C.white, -90);
}

export function drawPs(p) {
  p.hstripes([C.black, C.white, C.green]);
  p.poly(
    [
      [0, 0],
      [13, 9],
      [0, 18],
    ],
    C.red
  );
}

export function drawQa(p) {
  p.bg(C.maroon);
  p.rect(0, 0, 8, 18, C.white);
  for (let y = 0; y < 18; y += 2) {
    p.poly(
      [
        [8, y],
        [12, y + 1],
        [8, y + 2],
      ],
      C.white
    );
  }
}

export function drawSd(p) {
  p.hstripes([C.red, C.white, C.black]);
  p.poly(
    [
      [0, 0],
      [13, 9],
      [0, 18],
    ],
    C.green
  );
}

export function drawTr(p) {
  p.bg(C.red);
  p.disk(12, 9, 5, C.white);
  p.disk(14, 9, 4, C.red);
  p.star(21, 9, 3.2, 1.35, C.white, -90);
}

export function drawAg(p) {
  p.bg(C.red);
  p.poly(
    [
      [0, 0],
      [16, 18],
      [32, 0],
    ],
    C.black
  );
  p.rect(7, 8, 18, 5, C.blue);
  p.rect(5, 13, 22, 5, C.white);
  p.star(16, 7, 5, 1.8, C.yellow, -90);
}

export function drawBa(p) {
  p.bg(C.blue);
  p.poly(
    [
      [10, 0],
      [27, 0],
      [27, 18],
    ],
    C.yellow
  );
  for (const [x, y] of [
    [12, 2],
    [15, 5],
    [18, 8],
    [21, 11],
    [24, 14],
  ]) {
    p.star(x, y, 1.7, 0.7, C.white, -90);
  }
}

export function drawBi(p) {
  p.bg(C.white);
  p.poly(
    [
      [0, 0],
      [13, 9],
      [0, 18],
    ],
    C.green
  );
  p.poly(
    [
      [32, 0],
      [19, 9],
      [32, 18],
    ],
    C.green
  );
  p.poly(
    [
      [0, 0],
      [16, 7],
      [32, 0],
    ],
    C.red
  );
  p.poly(
    [
      [0, 18],
      [16, 11],
      [32, 18],
    ],
    C.red
  );
  p.disk(16, 9, 4, C.white);
  p.star(16, 6, 1.3, 0.5, C.red, -90);
  p.star(13, 11, 1.3, 0.5, C.red, -90);
  p.star(19, 11, 1.3, 0.5, C.red, -90);
}

export function drawBn(p) {
  p.bg(C.yellow);
  p.poly(
    [
      [0, 4],
      [0, 8],
      [32, 16],
      [32, 12],
    ],
    C.white
  );
  p.poly(
    [
      [0, 6],
      [0, 9],
      [32, 18],
      [32, 15],
    ],
    C.black
  );
  p.rect(15, 6, 2, 8, C.red);
  p.rect(13, 10, 6, 2, C.red);
}

export function drawBr(p) {
  p.bg(C.green);
  p.poly(
    [
      [16, 2],
      [28, 9],
      [16, 16],
      [4, 9],
    ],
    C.yellow
  );
  p.disk(16, 9, 5, C.blue);
  p.rect(12, 8, 8, 1, C.white);
}

export function drawBt(p) {
  p.bg(C.orange);
  p.poly(
    [
      [0, 0],
      [32, 0],
      [0, 18],
    ],
    C.yellow
  );
  p.rect(11, 7, 11, 2, C.white);
  p.rect(14, 5, 2, 8, C.white);
  p.rect(20, 6, 2, 2, C.white);
}

export function drawBy(p) {
  p.rect(0, 0, 5, 18, C.white);
  for (let y = 1; y < 18; y += 4) {
    p.rect(1, y, 3, 2, C.red);
  }
  p.rect(5, 0, 27, 12, C.red);
  p.rect(5, 12, 27, 6, C.green);
}

export function drawCd(p) {
  p.bg(C.sky);
  p.poly(
    [
      [0, 18],
      [4, 18],
      [32, 3],
      [32, 0],
      [28, 0],
      [0, 15],
    ],
    C.yellow
  );
  p.poly(
    [
      [0, 18],
      [2, 18],
      [32, 2],
      [32, 0],
      [30, 0],
      [0, 16],
    ],
    C.red
  );
  p.star(7, 5, 3, 1.2, C.yellow, -90);
}

export function drawCf(p) {
  p.rect(0, 0, 32, 5, C.blue);
  p.rect(0, 5, 32, 4, C.white);
  p.rect(0, 9, 32, 4, C.green);
  p.rect(0, 13, 32, 5, C.yellow);
  p.rect(14, 0, 4, 18, C.red);
  p.star(5, 3, 2, 0.8, C.yellow, -90);
}

export function drawCv(p) {
  p.bg(C.blue);
  p.rect(0, 10, 32, 2, C.white);
  p.rect(0, 12, 32, 2, C.red);
  p.rect(0, 14, 32, 2, C.white);
  p.starRing(11, 9, C.yellow);
}

export function drawDj(p) {
  p.rect(0, 0, 32, 9, C.sky);
  p.rect(0, 9, 32, 9, C.green);
  p.poly(
    [
      [0, 0],
      [15, 9],
      [0, 18],
    ],
    C.white
  );
  p.star(5, 9, 2.7, 1.1, C.red, -90);
}

export function drawDm(p) {
  p.bg(C.green);
  p.cross(C.yellow, 13, 7, 6, 4);
  p.cross(C.black, 14, 8, 4, 2);
  p.disk(16, 9, 4, C.red);
  p.starRing(16, 9, C.yellow, 2);
}

export function drawEr(p) {
  p.rect(0, 0, 32, 9, C.green);
  p.rect(0, 9, 32, 9, C.sky);
  p.poly(
    [
      [0, 0],
      [25, 9],
      [0, 18],
    ],
    C.red
  );
  p.rect(5, 6, 2, 6, C.yellow);
  p.rect(4, 11, 5, 1, C.yellow);
}

export function drawGd(p) {
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

export function drawGe(p) {
  p.bg(C.white);
  p.cross(C.red, 14, 7, 4, 4);
  for (const [x, y] of [
    [7, 4],
    [25, 4],
    [7, 14],
    [25, 14],
  ]) {
    p.rect(x - 1, y, 3, 1, C.red);
    p.rect(x, y - 1, 1, 3, C.red);
  }
}

export function drawGq(p) {
  p.hstripes([C.green, C.white, C.red]);
  p.poly(
    [
      [0, 0],
      [12, 9],
      [0, 18],
    ],
    C.sky
  );
  p.miniSeal(16, 9, C.brown);
}

export function drawGy(p) {
  p.bg(C.green);
  p.poly(
    [
      [0, 0],
      [31, 9],
      [0, 18],
    ],
    C.white
  );
  p.poly(
    [
      [0, 2],
      [27, 9],
      [0, 16],
    ],
    C.yellow
  );
  p.poly(
    [
      [0, 0],
      [16, 9],
      [0, 18],
    ],
    C.black
  );
  p.poly(
    [
      [0, 2],
      [13, 9],
      [0, 16],
    ],
    C.red
  );
}

export function drawJm(p) {
  p.bg(C.green);
  p.poly(
    [
      [0, 0],
      [16, 8],
      [32, 0],
      [32, 3],
      [16, 10],
      [0, 3],
    ],
    C.yellow
  );
  p.poly(
    [
      [0, 18],
      [16, 10],
      [32, 18],
      [32, 15],
      [16, 8],
      [0, 15],
    ],
    C.yellow
  );
  p.poly(
    [
      [0, 0],
      [14, 9],
      [0, 18],
    ],
    C.black
  );
  p.poly(
    [
      [32, 0],
      [18, 9],
      [32, 18],
    ],
    C.black
  );
}

export function drawKe(p) {
  p.rect(0, 0, 32, 5, C.black);
  p.rect(0, 6, 32, 6, C.red);
  p.rect(0, 13, 32, 5, C.green);
  p.rect(0, 5, 32, 1, C.white);
  p.rect(0, 12, 32, 1, C.white);
  p.disk(16, 9, 4, C.black);
  p.rect(14, 6, 4, 6, C.red);
  p.rect(15, 5, 2, 8, C.white);
}

export function drawKi(p) {
  p.rect(0, 0, 32, 9, C.red);
  p.rect(0, 9, 32, 9, C.blue);
  p.sunrise(15, 8, C.yellow);
  p.rect(0, 11, 32, 1, C.white);
  p.rect(0, 14, 32, 1, C.white);
  p.eagle(16, 5, C.yellow);
}

export function drawKm(p) {
  p.rect(0, 0, 32, 5, C.yellow);
  p.rect(0, 5, 32, 4, C.white);
  p.rect(0, 9, 32, 4, C.red);
  p.rect(0, 13, 32, 5, C.blue);
  p.poly(
    [
      [0, 0],
      [12, 9],
      [0, 18],
    ],
    C.green
  );
  p.crescent(5, 9, 3, C.white, C.green);
}

export function drawKn(p) {
  p.bg(C.green);
  p.poly(
    [
      [32, 0],
      [0, 18],
      [32, 18],
    ],
    C.red
  );
  p.poly(
    [
      [0, 18],
      [4, 18],
      [32, 3],
      [32, 0],
      [28, 0],
      [0, 15],
    ],
    C.yellow
  );
  p.poly(
    [
      [0, 18],
      [2, 18],
      [32, 2],
      [32, 0],
      [30, 0],
      [0, 16],
    ],
    C.black
  );
  p.star(12, 12, 2, 0.8, C.white, -90);
  p.star(21, 6, 2, 0.8, C.white, -90);
}

export function drawKr(p) {
  p.bg(C.white);
  p.disk(16, 9, 4, C.red);
  p.rect(12, 9, 8, 4, C.blue);
  for (const [x, y] of [
    [6, 4],
    [24, 4],
    [6, 14],
    [24, 14],
  ]) {
    p.rect(x - 2, y - 1, 4, 1, C.black);
    p.rect(x - 2, y + 1, 4, 1, C.black);
  }
}

export function drawLc(p) {
  p.bg(C.sky);
  p.poly(
    [
      [16, 3],
      [24, 15],
      [8, 15],
    ],
    C.white
  );
  p.poly(
    [
      [16, 5],
      [22, 15],
      [10, 15],
    ],
    C.black
  );
  p.poly(
    [
      [16, 9],
      [21, 15],
      [11, 15],
    ],
    C.yellow
  );
}

export function drawLk(p) {
  p.bg(C.yellow);
  p.rect(3, 3, 4, 12, C.green);
  p.rect(7, 3, 4, 12, C.orange);
  p.rect(12, 2, 18, 14, C.maroon);
  p.eagle(21, 9, C.yellow);
}

export function drawLr(p) {
  p.bg(C.white);
  for (let y = 0; y < 18; y += 4) p.rect(0, y, 32, 2, C.red);
  p.rect(0, 0, 13, 9, C.blue);
  p.star(6.5, 4.5, 3, 1.2, C.white, -90);
}

export function drawMh(p) {
  p.bg(C.blue);
  p.poly(
    [
      [0, 18],
      [32, 8],
      [32, 12],
    ],
    C.orange
  );
  p.poly(
    [
      [0, 18],
      [32, 3],
      [32, 6],
    ],
    C.white
  );
  p.star(7, 5, 4, 1.5, C.white, -90);
}

export function drawMk(p) {
  p.bg(C.red);
  for (const points of [
    [
      [16, 9],
      [0, 0],
      [5, 0],
    ],
    [
      [16, 9],
      [27, 0],
      [32, 0],
    ],
    [
      [16, 9],
      [0, 18],
      [5, 18],
    ],
    [
      [16, 9],
      [27, 18],
      [32, 18],
    ],
    [
      [16, 9],
      [0, 7],
      [0, 11],
    ],
    [
      [16, 9],
      [32, 7],
      [32, 11],
    ],
  ]) {
    p.poly(points, C.yellow);
  }
  p.disk(16, 9, 4, C.yellow);
}

export function drawMy(p) {
  p.bg(C.white);
  for (let y = 0; y < 18; y += 3) p.rect(0, y, 32, 2, C.red);
  p.rect(0, 0, 15, 10, C.blue);
  p.crescent(7, 5, 3, C.yellow, C.blue);
  p.star(11, 5, 2.4, 1, C.yellow, -90);
}

export function drawMz(p) {
  p.rect(0, 0, 32, 5, C.green);
  p.rect(0, 6, 32, 5, C.black);
  p.rect(0, 13, 32, 5, C.yellow);
  p.rect(0, 5, 32, 1, C.white);
  p.rect(0, 12, 32, 1, C.white);
  p.poly(
    [
      [0, 0],
      [14, 9],
      [0, 18],
    ],
    C.red
  );
  p.star(5, 9, 3, 1.2, C.yellow, -90);
}

export function drawNa(p) {
  p.bg(C.green);
  p.poly(
    [
      [0, 0],
      [32, 0],
      [0, 18],
    ],
    C.blue
  );
  p.poly(
    [
      [0, 16],
      [30, 0],
      [32, 0],
      [2, 18],
    ],
    C.white
  );
  p.poly(
    [
      [0, 18],
      [32, 2],
      [32, 6],
      [6, 18],
    ],
    C.red
  );
  p.sun(6, 5, C.yellow);
}

export function drawNp(p) {
  p.bg(C.white);
  p.poly(
    [
      [3, 0],
      [20, 7],
      [9, 9],
      [22, 18],
      [3, 18],
    ],
    C.blue
  );
  p.poly(
    [
      [5, 2],
      [16, 7],
      [7, 9],
      [18, 16],
      [5, 16],
    ],
    C.red
  );
  p.crescent(8, 7, 2.4, C.white, C.red);
  p.star(10, 14, 2.2, 0.9, C.white, -90);
}

export function drawPg(p) {
  p.bg(C.black);
  p.poly(
    [
      [32, 0],
      [0, 0],
      [32, 18],
    ],
    C.red
  );
  p.eagle(23, 6, C.yellow);
  for (const [x, y] of [
    [6, 6],
    [9, 10],
    [4, 12],
  ])
    p.star(x, y, 1.5, 0.6, C.white, -90);
}

export function drawPh(p) {
  p.rect(0, 0, 32, 9, C.blue);
  p.rect(0, 9, 32, 9, C.red);
  p.poly(
    [
      [0, 0],
      [14, 9],
      [0, 18],
    ],
    C.white
  );
  p.sun(5, 9, C.yellow);
  p.star(2, 3, 1.2, 0.5, C.yellow, -90);
  p.star(2, 15, 1.2, 0.5, C.yellow, -90);
  p.star(10, 9, 1.2, 0.5, C.yellow, -90);
}

export function drawSb(p) {
  p.bg(C.green);
  p.poly(
    [
      [0, 0],
      [32, 0],
      [0, 18],
    ],
    C.blue
  );
  p.poly(
    [
      [0, 18],
      [32, 2],
      [32, 5],
      [5, 18],
    ],
    C.yellow
  );
  for (const [x, y] of [
    [5, 3],
    [9, 3],
    [7, 6],
    [4, 8],
    [10, 8],
  ])
    p.star(x, y, 1.2, 0.5, C.white, -90);
}

export function drawSc(p) {
  p.bg(C.green);
  p.poly(
    [
      [0, 18],
      [0, 0],
      [7, 18],
    ],
    C.blue
  );
  p.poly(
    [
      [7, 18],
      [0, 0],
      [14, 18],
    ],
    C.yellow
  );
  p.poly(
    [
      [14, 18],
      [0, 0],
      [22, 18],
    ],
    C.red
  );
  p.poly(
    [
      [22, 18],
      [0, 0],
      [28, 18],
    ],
    C.white
  );
}

export function drawSs(p) {
  p.rect(0, 0, 32, 5, C.black);
  p.rect(0, 6, 32, 5, C.red);
  p.rect(0, 13, 32, 5, C.green);
  p.rect(0, 5, 32, 1, C.white);
  p.rect(0, 12, 32, 1, C.white);
  p.poly(
    [
      [0, 0],
      [14, 9],
      [0, 18],
    ],
    C.blue
  );
  p.star(5, 9, 3, 1.2, C.yellow, -90);
}

export function drawSx(p) {
  p.bg(C.white);
  p.poly(
    [
      [0, 0],
      [32, 0],
      [0, 18],
    ],
    C.red
  );
  p.poly(
    [
      [0, 18],
      [32, 18],
      [0, 7],
    ],
    C.blue
  );
  p.miniSeal(12, 8, C.yellow);
}

export function drawSz(p) {
  p.rect(0, 0, 32, 4, C.blue);
  p.rect(0, 4, 32, 2, C.yellow);
  p.rect(0, 6, 32, 6, C.red);
  p.rect(0, 12, 32, 2, C.yellow);
  p.rect(0, 14, 32, 4, C.blue);
  p.rect(11, 8, 10, 2, C.white);
  p.rect(14, 6, 4, 6, C.black);
}

export function drawTg(p) {
  p.rect(0, 0, 32, 4, C.green);
  p.rect(0, 4, 32, 4, C.yellow);
  p.rect(0, 8, 32, 4, C.green);
  p.rect(0, 12, 32, 3, C.yellow);
  p.rect(0, 15, 32, 3, C.green);
  p.rect(0, 0, 13, 10, C.red);
  p.star(6, 5, 3, 1.2, C.white, -90);
}

export function drawTz(p) {
  p.bg(C.sky);
  p.poly(
    [
      [0, 0],
      [32, 0],
      [0, 18],
    ],
    C.green
  );
  p.poly(
    [
      [0, 18],
      [32, 2],
      [32, 7],
      [8, 18],
    ],
    C.yellow
  );
  p.poly(
    [
      [0, 18],
      [32, 5],
      [32, 10],
      [12, 18],
    ],
    C.black
  );
}

export function drawUs(p) {
  p.bg(C.white);
  for (let y = 0; y < 18; y += 3) p.rect(0, y, 32, 2, C.red);
  p.rect(0, 0, 14, 10, C.blue);
  for (const [x, y] of [
    [2, 2],
    [5, 2],
    [8, 2],
    [11, 2],
    [3, 5],
    [6, 5],
    [9, 5],
    [12, 5],
    [2, 8],
    [5, 8],
    [8, 8],
    [11, 8],
  ])
    p.rect(x, y, 1, 1, C.white);
}

export function drawVu(p) {
  p.rect(0, 0, 32, 9, C.red);
  p.rect(0, 9, 32, 9, C.green);
  p.poly(
    [
      [0, 0],
      [14, 9],
      [0, 18],
    ],
    C.black
  );
  p.poly(
    [
      [0, 1],
      [12, 9],
      [0, 17],
    ],
    C.yellow
  );
  p.poly(
    [
      [0, 3],
      [9, 9],
      [0, 15],
    ],
    C.black
  );
  p.rect(9, 8, 23, 2, C.yellow);
  p.rect(10, 8, 22, 1, C.black);
}

export function drawZa(p) {
  p.rect(0, 0, 32, 9, C.red);
  p.rect(0, 9, 32, 9, C.blue);
  p.poly(
    [
      [0, 0],
      [15, 9],
      [0, 18],
    ],
    C.black
  );
  p.poly(
    [
      [0, 0],
      [19, 9],
      [0, 18],
      [0, 14],
      [12, 9],
      [0, 4],
    ],
    C.yellow
  );
  p.poly(
    [
      [0, 2],
      [14, 9],
      [0, 16],
      [0, 13],
      [9, 9],
      [0, 5],
    ],
    C.green
  );
  p.rect(12, 7, 20, 4, C.green);
  p.rect(13, 6, 19, 1, C.white);
  p.rect(13, 11, 19, 1, C.white);
}

export function drawZw(p) {
  p.rect(0, 0, 32, 3, C.green);
  p.rect(0, 3, 32, 2, C.yellow);
  p.rect(0, 5, 32, 2, C.red);
  p.rect(0, 7, 32, 4, C.black);
  p.rect(0, 11, 32, 2, C.red);
  p.rect(0, 13, 32, 2, C.yellow);
  p.rect(0, 15, 32, 3, C.green);
  p.poly(
    [
      [0, 0],
      [15, 9],
      [0, 18],
    ],
    C.white
  );
  p.star(5, 9, 3, 1.2, C.red, -90);
}

export function drawAi(p) {
  p.bg(C.blue);
  p.unionCanton();
  p.rect(22, 5, 7, 7, C.white);
  p.rect(23, 7, 5, 1, C.sky);
  p.rect(23, 9, 5, 1, C.sky);
  p.rect(24, 6, 3, 5, C.orange);
}

export function drawAq(p) {
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

export function drawAs(p) {
  p.bg(C.blue);
  p.poly(
    [
      [0, 0],
      [27, 9],
      [0, 18],
    ],
    C.white
  );
  p.poly(
    [
      [0, 2],
      [23, 9],
      [0, 16],
    ],
    C.red
  );
  p.eagle(23, 9, C.yellow);
  p.rect(24, 8, 3, 2, C.white);
}

export function drawBm(p) {
  p.bg(C.red);
  p.unionCanton();
  p.rect(23, 6, 6, 6, C.white);
  p.rect(24, 7, 4, 2, C.green);
  p.rect(24, 10, 4, 1, C.blue);
}

export function drawCc(p) {
  p.bg(C.green);
  p.disk(7, 5, 3, C.yellow);
  p.rect(6, 5, 2, 6, C.green);
  p.crescent(18, 9, 3, C.white, C.green);
  p.southernCross(C.white, false);
}

export function drawCx(p) {
  p.bg(C.green);
  p.poly(
    [
      [0, 0],
      [32, 0],
      [0, 18],
    ],
    C.blue
  );
  p.southernCross(C.white, false);
  p.disk(24, 11, 4, C.yellow);
  p.eagle(8, 6, C.yellow);
}

export function drawIo(p) {
  p.bg(C.white);
  for (let y = 2; y < 18; y += 4) {
    p.rect(0, y, 32, 2, C.blue);
  }
  p.unionCanton();
  p.rect(24, 8, 2, 7, C.green);
  p.rect(21, 9, 8, 2, C.green);
  p.crown(25, 5, C.yellow);
}

export function drawPm(p) {
  p.bg(C.blue);
  p.rect(0, 0, 8, 6, C.green);
  p.rect(0, 6, 8, 6, C.white);
  p.rect(0, 12, 8, 6, C.red);
  p.rect(12, 7, 12, 4, C.yellow);
  p.rect(14, 5, 8, 2, C.yellow);
  p.rect(15, 11, 6, 1, C.white);
}

export function drawPr(p) {
  p.bg(C.white);
  for (let y = 0; y < 18; y += 4) {
    p.rect(0, y, 32, 2, C.red);
  }
  p.poly(
    [
      [0, 0],
      [15, 9],
      [0, 18],
    ],
    C.blue
  );
  p.star(5, 9, 3, 1.2, C.white, -90);
}

export function drawTf(p) {
  p.bg(C.blue);
  p.rect(4, 0, 4, 8, C.white);
  p.rect(8, 0, 4, 8, C.red);
  p.star(22, 4, 1.5, 0.6, C.white, -90);
  p.star(25, 8, 1.5, 0.6, C.white, -90);
  p.star(20, 12, 1.5, 0.6, C.white, -90);
  p.star(27, 13, 1.5, 0.6, C.white, -90);
}

export function drawVi(p) {
  p.bg(C.white);
  p.eagle(16, 8, C.yellow);
  p.rect(7, 5, 2, 8, C.blue);
  p.rect(23, 5, 2, 8, C.blue);
  p.rect(13, 11, 6, 2, C.green);
}
