let last = new Date();

export default function FPS(now) {
  const fps = 1000 / (now - last);
  last = now;

  return ~~fps;
}
