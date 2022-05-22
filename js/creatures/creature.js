import Sprite from "../sprite";

let idx = 0;

export default class Creature extends Sprite {
  constructor(sz, vision, color, id, sheet) {
    super(sz, color, sheet);
    this.vision = vision;

    this.name = `${id}${++idx}`;
  }

  render(ctx, vision = false) {
    super.render(ctx);

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

      ctx.beginPath();
      ctx.arc(
        this.pos.x,
        this.pos.y,
        this.size / 2 + this.range,
        0,
        Math.PI * 2,
        false
      );

      ctx.fillStyle = `rgba(0, 255, 255, 0.5)`;
      ctx.fill();
    }

    if (!!!this.sheet) {
      ctx.beginPath();
      ctx.arc(this.pos.x, this.pos.y, this.size * 0.66, 0, Math.PI * 2, false);

      ctx.fillStyle = `rgb(255, 255, 255)`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(this.pos.x, this.pos.y, this.size / 2, 0, Math.PI * 2, false);

      ctx.fillStyle = this.color;
      ctx.fill();
    }

    super.render(ctx);
  }
}
