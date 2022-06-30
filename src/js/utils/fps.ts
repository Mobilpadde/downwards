let last = 0;

export default function FPS(now: number): number {
  const fps = 1000 / (now - last);
  last = now;

  return ~~fps;
}
