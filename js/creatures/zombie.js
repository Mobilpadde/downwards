import * as s from "../settings";

import Log from "../logger";
import Vec from "../vec";
import Creature from "./creature";

export default class Zombie extends Creature {
  constructor() {
    super(s.creature.size, s.creature.vision, "teal", "z");

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
    if (p.invisible || this.cooldown > 0) return;

    if (p.pos.distSq(this.pos) < this.range * this.range + this.size * p.size) {
      Log(`${this.name}: ${s.attack.adverb()} ${s.attack.noun()} "${p.name}"`);
      this.cooldown = s.creature.cooldown;
    }
  }

  think(p) {
    if (
      p.pos.distSq(this.pos) < this.vision * this.vision + this.size * p.size &&
      !p.invisible
    ) {
      if (p.pos.x < this.pos.x) {
        this.move.x = -this.speed;
      } else if (p.pos.x > this.pos.x) {
        this.move.x = this.speed;
      } else {
        this.move.x = 0;
      }

      if (p.pos.y < this.pos.y) {
        this.move.y = -this.speed;
      } else if (p.pos.y > this.pos.y) {
        this.move.y = this.speed;
      } else {
        this.move.y = 0;
      }

      return;
    }

    if (this.dream.x < this.pos.x) {
      this.move.x = -this.speed;
    } else if (this.dream.x > this.pos.x) {
      this.move.x = this.speed;
    } else {
      this.move.x = 0;
    }

    if (this.dream.y < this.pos.y) {
      this.move.y = -this.speed;
    } else if (this.dream.y > this.pos.y) {
      this.move.y = this.speed;
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
}
