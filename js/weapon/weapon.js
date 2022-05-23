import Vec from "../utils/vec";

let idx = 0;

export default class Weapon {
  constructor({
    range,
    id,
    cooldown,
    damage,
    color,
    pos,
    size,
    speed,
    idx: index,
  }) {
    this.color = color;
    this.range = range;
    this.size = size;
    this.speedMult = speed;

    this.id = ++idx;
    this.pos = pos.clone();
    this.move = new Vec();

    this.name = `${id}${this.id}`;

    this.damage = damage;
    this.cooldown = cooldown;
    setInterval(() => this.cooldown--, 10);

    this.updatePos(index);
  }

  updatePos(idx) {
    if (idx % 4 == 0) this.posAddition = new Vec(-(this.size * 2) * 1.25, 0);
    else if (idx % 3 == 0) this.posAddition = new Vec(0, this.size * 2 * 1.25);
    else if (idx % 2 == 0) this.posAddition = new Vec(this.size * 2 * 1.25, 0);
    else this.posAddition = new Vec(0, -(this.size * 2) * 1.25);
  }

  update(speed) {
    if (this.dream) {
      const spd = this.speedMult * speed;

      if (this.dream.distSq(this.pos) < 5) {
        this.move.x = 0;
        this.move.y = 0;
        return;
      }

      if (this.dream.x < this.pos.x) {
        this.move.x = -spd;
      } else if (this.dream.x > this.pos.x) {
        this.move.x = spd;
      } else {
        this.move.x = 0;
      }

      if (this.dream.y < this.pos.y) {
        this.move.y = -spd;
      } else if (this.dream.y > this.pos.y) {
        this.move.y = spd;
      } else {
        this.move.y = 0;
      }

      this.pos.add(this.move.x, this.move.y);
    }
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.size * 0.66, 0, Math.PI * 2, false);

    ctx.fillStyle = `rgb(255, 255, 255)`;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.size / 2, 0, Math.PI * 2, false);

    ctx.fillStyle = this.color;
    ctx.fill();
  }
}
