import * as s from "../settings";

import Log from "../logger";
import Creature from "./creature";
import Fist from "../weapon/fist";

export default class Player extends Creature {
  constructor() {
    super({
      health: s.creature.health,
      damage: s.creature.damage,
      size: s.creature.size,
      vision: s.creature.vision,
      color: "rgba(45, 45, 45, 1)",
      id: "p",
      // sheet: "/static/person.png"
    });

    this.weapons = new Array(1)
      .fill(0)
      .map((_, idx) => new Fist({ pos: this.pos, size: this.size, idx }));

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

      Space: false,
    };

    this.range = s.creature.range;
    this.cooldown = 0;
    setInterval(() => this.cooldown--, 10);

    window.addEventListener("keyup", ({ code }) => (this.keys[code] = false));
    window.addEventListener("keydown", ({ code }) => (this.keys[code] = true));

    let logged = false;
    window.addEventListener("keyup", ({ code }) => {
      if (code === "Space") {
        Log(`${this.name}: invisible "${this.keys.Space.toString()}"`);
        logged = false;
      }
    });

    window.addEventListener("keydown", ({ code }) => {
      if (code === "Space" && !logged) {
        logged = true;
        Log(`${this.name}: invisible "${this.keys.Space.toString()}"`);
      }
    });

    this.updateInterval = null;
  }

  addWeapon() {
    if (this.weapons.length >= s.player.weapons) {
      this.weapons.shift();
    }

    this.weapons.push(
      new Fist({ pos: this.pos, size: this.size, idx: this.weapons.length })
    );
    this.weapons.forEach((w, i) => w.updatePos(i));
  }

  attack(others) {
    if (this.dead) return;
    this.weapons.forEach((w) => w.attack(others, this.pos.clone(), this.size));
  }

  think() {
    if (this.dead) return;

    this.invisible = this.keys.Space;

    if (this.keys.Space) {
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

    if (
      this.keys.KeyW ||
      this.keys.ArrowUp ||
      this.keys.KeyS ||
      this.keys.ArrowDown ||
      this.keys.KeyA ||
      this.keys.ArrowLeft ||
      this.keys.KeyD ||
      this.keys.ArrowRight
    ) {
      if (this.updateInterval) return;

      this.updateSheet();
      this.updateInterval = setInterval(() => this.updateSheet(), 150);
    } else {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(
      this.pos.x,
      this.pos.y,
      this.size * 1.33,
      0,
      Math.PI * (this.health.current / this.health.max) * 2,
      false
    );

    ctx.strokeStyle = `hsla(120deg, 75%, 50%, 0.6)`;
    ctx.lineWidth = 2;
    ctx.stroke();

    super.render(ctx);

    this.weapons.forEach((w) => w.render(ctx));
  }

  update(zombies, ctx) {
    if (!this.dead) {
      this.attack(zombies);
      this.think();
      this.move();

      this.weapons.forEach((w) => w.update(this.speed));
    }

    this.render(ctx);
  }
}
