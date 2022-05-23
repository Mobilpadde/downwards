import Vec from "../utils/vec";

export default class Dither {
  static render(dat, range) {
    const newDat = new ImageData(dat.width, dat.height);

    const hW = ~~(dat.width / 2);
    const hH = ~~(dat.height / 2);
    const center = new Vec(hW, hH);

    for (let i = 0; i <= dat.data.length; i += 4) {
      const y = ~~(i / 4 / dat.width);
      const x = i / 4 - y * dat.width;

      const p = new Vec(x, y);
      const d = p.dist(center);
      if (d < range) {
        newDat.data[i + 0] = dat.data[i + 0];
        newDat.data[i + 1] = dat.data[i + 1];
        newDat.data[i + 2] = dat.data[i + 2];
        newDat.data[i + 3] = 255 - ~~(255 * (d / range));
      }
    }

    return newDat;
  }

  static square(ctx, range, p, size) {
    const center = p.pos.clone().subScalar(p.size);

    const sz = p.size * 3;
    const minX = ~~(center.x - size / 2);
    const minY = ~~(center.y - size / 2);

    for (let y = minY; y < center.y + size / 2; y += ~~sz) {
      for (let x = minX; x < center.x + size / 2; x += ~~sz) {
        const p = new Vec(x, y);
        const d = p.dist(center);

        ctx.fillStyle = `rgba(0, 0, 0, ${Math.max(d / range, 0.2)})`;
        ctx.fillRect(x, y, sz, sz);
      }
    }
  }
}
