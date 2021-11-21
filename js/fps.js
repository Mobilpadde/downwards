let last = new Date()

export default function FPS() {
  const now = new Date()
  const fps = 1000 / (now - last)
  last = now

  return ~~fps
}
