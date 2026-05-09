export function splitEvenly(total, parts) {
  const base = Math.floor(total / parts);
  const widths = Array.from({ length: parts }, () => base);
  for (let index = 0; index < total - base * parts; index += 1) {
    widths[index] += 1;
  }
  return widths;
}

export function parseColor(color) {
  const hex = color.replace("#", "");
  return [
    Number.parseInt(hex.slice(0, 2), 16),
    Number.parseInt(hex.slice(2, 4), 16),
    Number.parseInt(hex.slice(4, 6), 16),
    255,
  ];
}

export function containsPoint(points, x, y) {
  let inside = false;
  for (let index = 0, previous = points.length - 1; index < points.length; previous = index++) {
    const [xi, yi] = points[index];
    const [xj, yj] = points[previous];
    const intersects = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersects) {
      inside = !inside;
    }
  }
  return inside;
}
