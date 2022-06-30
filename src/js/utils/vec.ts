export default class Vec {
  static random(xm: number, xn: number, ym: number, yn: number) {
    const x = Math.random() * (xn - xm) + xm;
    const y = Math.random() * (yn - ym) + ym;

    return new Vec(x, y);
  }

  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return `{ ${this.x.toFixed(0)}, ${this.y.toFixed(0)} }`;
  }

  clone() {
    return new Vec(this.x, this.y);
  }

  dist(v: Vec) {
    return Math.sqrt(this.distSq(v));
  }

  distSq(v: Vec) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;

    return dx * dx + dy * dy;
  }

  add(x: number, y: number) {
    this.x += x;
    this.y += y;

    return this;
  }

  addX(x: number) {
    this.x += x;
  }

  addY(y: number) {
    this.y += y;
  }

  addScalar(x: number) {
    return this.add(x, x);
  }

  sub(x: number, y: number) {
    this.x -= x;
    this.y -= y;

    return this;
  }

  subScalar(x: number) {
    return this.sub(x, x);
  }

  randomizeY(x: number, y: number) {
    const v = Vec.random(x, y, 0, 0);
    this.y = v.x;
  }
}
