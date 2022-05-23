let last = new Date();

export default function FPS(time) {
  const now = time;
  const fps = 1000 / (now - last);
  last = now;

  return ~~fps;
}
