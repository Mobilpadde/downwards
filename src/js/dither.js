export default class Dither {
  static render(dat, range, dither) {
    const newDat = new ImageData(dat.width, dat.height);

    const hW = ~~(dat.width / 2);
    const hH = ~~(dat.height / 2);

    for (let i = 0; i <= dat.data.length; i += 4) {
      const y = ~~(i / 4 / dat.width);
      const x = i / 4 - y * dat.width;

      const d = dist(x, y, hW, hH);
      if (d < range * range) {
        newDat.data[i + 0] = dat.data[i + 0];
        newDat.data[i + 1] = dat.data[i + 1];
        newDat.data[i + 2] = dat.data[i + 2];
        newDat.data[i + 3] = 255 - ~~(255 * (d / (range * range)));
      }
    }

    return newDat;
  }
}
