import * as s from "../settings";

import Log from "../logger";
import Creature from "./creature";

export default class Player extends Creature {
  constructor() {
    super(s.creature.size, s.creature.vision, "rgba(45, 45, 45, 1)", "p");

    this.speed = 1.25;
    this.invisible = false;
    this.keys = {
      KeyW: false,
      ArrowUp: false,

      KeyS: false,
      ArrowDown: false,

      KeyA: false,
      ArrowLeft: false,

      KeyD: false,
      ArrowRight: false,

      KeyZ: false,
      Space: false,
    };

    this.range = s.creature.range;
    this.cooldown = 0;
    setInterval(() => this.cooldown--, 10);
    window.addEventListener("keyup", ({ code }) => (this.keys[code] = false));
    window.addEventListener("keydown", ({ code }) => (this.keys[code] = true));

    let logged = false;
    window.addEventListener("keyup", ({ code }) => {
      if (code === "KeyZ") {
        Log(`${this.name}: invisible "${this.keys.KeyZ.toString()}"`);
        logged = false;
      }
    });

    window.addEventListener("keydown", ({ code }) => {
      if (code === "KeyZ" && !logged) {
        logged = true;
        Log(`${this.name}: invisible "${this.keys.KeyZ.toString()}"`);
      }
    });
  }

  attack(others) {
    if (!this.keys.Space || this.cooldown > 0) return;

    const o = others.find(
      (o) =>
        o.pos.distSq(this.pos) < this.range * this.range + this.size * o.size
    );
    if (!!o) {
      Log(`${this.name} ${s.attack.adverb()} ${s.attack.noun()} "${o.name}"`);
      this.cooldown = s.creature.cooldown;
    }
  }

  think() {
    this.invisible = this.keys.KeyZ;

    if (this.keys.KeyZ) {
      this.color = "rgba(45, 45, 45, 0.5)";
    } else {
      this.color = "rgba(45, 45, 45, 1)";
    }
  }

  move() {
    if (this.keys.KeyW || this.keys.ArrowUp) {
      this.pos.add(0, -this.speed);
    }

    if (this.keys.KeyS || this.keys.ArrowDown) {
      this.pos.add(0, this.speed);
    }

    if (this.keys.KeyA || this.keys.ArrowLeft) {
      this.pos.add(-this.speed, 0);
    }

    if (this.keys.KeyD || this.keys.ArrowRight) {
      this.pos.add(this.speed, 0);
    }
  }
}
