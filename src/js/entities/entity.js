import { map } from "../settings";
import Vec from "../vec";
import Log from "../logger";

let idx = 0;

export default class Entity {
  constructor(sz, color) {
    this.color = color;
    this.size = sz;
    this.pos = Vec.random(sz.x, map.size - sz.x, sz.y, map.size - sz.y);

    this.name = `e${idx++}`;
  }

  trigger(p, dist) {
    const a = this.pos.clone().add(this.size.x / 2, this.size.y / 2);

    if (dist(p.pos.x, p.pos.y, a.x, a.y) < this.size.x * this.size.y + p.size) {
      Log(`${p.name} triggerd "${this.name}"`);
      return true;
    }

    return false;
  }

  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
  }
}
