import * as s from "../settings";
import { attackZombie } from "../settings/filters";

import Log from "../logger";
import Vec from "../vec";
import Creature from "./creature";

export default class Zombie extends Creature {
  constructor() {
    super({
      health: s.creature.health,
      damage: s.creature.damage,
      size: s.creature.size,
      vision: s.creature.vision,
      color: "teal",
      id: "z",
    });

    this.range = s.creature.range;
    this.speed = 0.25 + Math.random() * 0.55;
    this.move = new Vec(this.speed, 0);
    this.cooldown = 0;

    this.dream = Vec.random(
      this.size,
      s.map.size - this.size,
      this.size,
      s.map.size - this.size
    );

    setInterval(() => this.cooldown--, 10);
  }

  attack(p) {
    if (p.invisible || (this.cooldown > 0 && !this.dead)) return;

    if (
      !p.dead &&
      p.pos.distSq(this.pos) < this.range * this.range + this.size * p.size
    ) {
      Log(
        `${this.name} ${s.attack.adverb()} ${s.attack.noun()} "${p.name}"`,
        attackZombie.toggled
      );
      this.cooldown = s.creature.cooldown;
      p.takeDamage(this.damage, this.name);
    }
  }

  follow(p) {
    if (
      !p.dead &&
      !p.invisible &&
      p.pos.distSq(this.pos) < this.vision * this.vision + this.size * p.size
    ) {
      const spd = this.speed;

      if (p.pos.x < this.pos.x) {
        this.move.x = -spd;
      } else if (p.pos.x > this.pos.x) {
        this.move.x = spd;
      } else {
        this.move.x = 0;
      }

      if (p.pos.y < this.pos.y) {
        this.move.y = -spd;
      } else if (p.pos.y > this.pos.y) {
        this.move.y = spd;
      } else {
        this.move.y = 0;
      }
    }
  }

  think() {
    if (this.dead) return;

    const spd = this.speed / 2;

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
    }

    if (this.dream.distSq(this.pos) < 10 * 10) {
      this.dream = Vec.random(
        this.size,
        s.map.size - this.size,
        this.size,
        s.map.size - this.size
      );
    }
  }

  wander() {
    this.pos.add(this.move.x, this.move.y);
  }

  render(ctx) {
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

    super.render(ctx);
  }

  update(player, ctx, vision) {
    if (!this.dead) {
      this.attack(player);
      this.think();
      this.follow(player);
      this.wander();
    }

    this.render(ctx, vision);
  }
}
