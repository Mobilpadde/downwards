import Events from "../events";
import Sprite from "../sprite";
import Log from "../logger";

let idx = 0;

export default class Creature extends Sprite {
  constructor({ vision, id, health, damage, ...o }) {
    super(o);
    this.vision = vision;

    this.damage = damage;
    this.dead = false;
    this.health = {
      current: health,
      max: health,
    };

    this.name = `${id}${++idx}`;
  }

  render(ctx, vision = false) {
    if (this.dead) {
      ctx.beginPath();
      ctx.arc(this.pos.x, this.pos.y, this.size / 2, 0, Math.PI * 2, false);

      ctx.fillStyle = this.color;
      ctx.fill();

      return;
    }

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

    // if (!!!this.sheet) {
    ctx.beginPath();
    ctx.arc(
      this.pos.x,
      this.pos.y,
      this.size * 0.99,
      0,
      Math.PI * (this.health.current / this.health.max) * 2,
      false
    );

    ctx.strokeStyle = `hsla(120deg, 75%, 50%, 0.6)`;
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.size * 0.66, 0, Math.PI * 2, false);

    ctx.fillStyle = `rgb(255, 255, 255)`;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.size / 2, 0, Math.PI * 2, false);

    ctx.fillStyle = this.color;
    ctx.fill();
    // } else {
    //   super.render(ctx);
    // }
  }

  takeDamage(dmg, dealer) {
    this.health.current -= dmg;

    if (this.health.current <= 0) {
      this.dead = true;
      Log(`${dealer} has killed "${this.name}"`);
      Events.emit("creature-dead", this.name);
    }
  }
}
