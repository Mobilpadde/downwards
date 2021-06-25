export function dist(x1: f64, y1: f64, x2: f64, y2: f64): f64 {
  const dx = x2 - x1;
  const dy = y2 - y1;

  return dx * dx + dy * dy;
}
