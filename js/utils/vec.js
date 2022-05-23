export default class Vec {
  static random(xm, xn, ym, yn) {
    const x = Math.random() * (xn - xm) + xm;
    const y = Math.random() * (yn - ym) + ym;

    return new Vec(x, y);
  }

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return `{ ${this.x.toFixed(0)}, ${this.y.toFixed(0)} }`;
  }

  clone() {
    return new Vec(this.x, this.y);
  }

  dist(v) {
    return Math.sqrt(this.distSq(v));
  }

  distSq(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;

    return dx * dx + dy * dy;
  }

  add(x, y) {
    this.x += x;
    this.y += y;

    return this;
  }

  addX(x) {
    this.x += x;
  }

  addY(y) {
    this.y += y;
  }

  addScalar(x) {
    return this.add(x, x);
  }

  sub(x, y) {
    this.x -= x;
    this.y -= y;

    return this;
  }

  subScalar(x) {
    return this.sub(x, x);
  }

  randomizeY(x, y) {
    const v = Vec.random(x, y, 0, 0);
    this.y = v.x;
  }
}
