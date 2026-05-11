export function background(color) {
  return (p) => p.bg(color);
}

export function horizontalStripes(colors) {
  return (p) => p.hstripes(colors);
}

export function verticalStripes(colors) {
  return (p) => p.vstripes(colors);
}
