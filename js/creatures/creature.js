import { map } from "../settings";
import Vec from "../vec";

let idx = 0;

export default class Creature {
  constructor(sz, vision, color, id) {
    this.size = sz;
    this.vision = vision;
    this.color = color;

    this.name = `${id}${idx++}`;
    this.pos = Vec.random(sz, map.size - sz, sz, map.size - sz);
  }

  render(ctx, vision = false) {
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.size / 2, 0, Math.PI * 2, false);

    ctx.fillStyle = this.color;
    ctx.fill();

    if (vision) {
      ctx.beginPath();
      ctx.arc(
        this.pos.x,
        this.pos.y,
        this.size / 2 + this.vision,
        0,
        Math.PI * 2,
        false
      );

      ctx.fillStyle = `rgba(255, 150, 0, 0.2)`;
      ctx.fill();
    }
  }
}
