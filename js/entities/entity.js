import { map } from "../settings/settings";
import Vec from "../utils/vec";

let idx = 0;

export default class Entity {
  constructor(sz, color) {
    this.color = color;
    this.size = sz;
    this.pos = Vec.random(sz.x, map.size - sz.x, sz.y, map.size - sz.y);

    this.name = `e${idx++}`;
  }

  trigger(p) {
    if (
      p.pos.distSq(this.pos.clone().add(this.size.x / 2, this.size.y / 2)) <
      this.size.x * this.size.y + p.size
    ) {
      return true;
    }

    return false;
  }

  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
  }
}
