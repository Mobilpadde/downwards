import { dist } from "./vec";

export function dither(
  width: i32,
  height: i32,
  range: f32,
  dat: Uint8ClampedArray
): Uint8ClampedArray {
  const newDat = new Uint8ClampedArray(width * height * 4);

  const hW = ~~(width / 2);
  const hH = ~~(height / 2);

  for (let i = 0; i <= dat.length; i += 4) {
    const y = ~~(i / 4 / width);
    const x = i / 4 - y * width;

    const d = dist(x, y, hW, hH);
    if (d < range * range) {
      newDat[i + 0] = dat[i + 0];
      newDat[i + 1] = dat[i + 1];
      newDat[i + 2] = dat[i + 2];
      newDat[i + 3] = (255 - Math.floor(255 * (d / (range * range)))) as u32;
    }
  }

  return newDat;
}
