import * as s from "../settings";
import { playerInvisible, weaponAdd, weaponRemove } from "../settings/filters";

import Log from "../logger";
import Creature from "./creature";
import Fist from "../weapon/fist";

export default class Player extends Creature {
  constructor() {
    super({
      health: s.player.health,
      damage: s.player.damage,
      size: s.player.size,
      vision: s.player.vision,
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

    window.addEventListener("keyup", this.keyUp.bind(this));
    window.addEventListener("keydown", this.keyDown.bind(this));

    this.logged = false;
    window.addEventListener("keyup", this.invisibleOff.bind(this));
    window.addEventListener("keydown", this.invisibleOn.bind(this));

    this.updateInterval = null;
  }

  keyUp({ code }) {
    if (this.dead) return;
    this.keys[code] = false;
  }

  keyDown({ code }) {
    if (this.dead) return;
    this.keys[code] = true;
  }

  invisibleOn({ code }) {
    if (this.dead) return;

    if (code === "Space" && !this.logged) {
      this.logged = true;
      Log(
        `${this.name}: invisible "${this.keys.Space.toString()}"`,
        playerInvisible.toggled
      );
    }
  }

  invisibleOff({ code }) {
    if (this.dead) return;

    if (code === "Space") {
      this.logged = false;
      Log(
        `${this.name}: invisible "${this.keys.Space.toString()}"`,
        playerInvisible.toggled
      );
    }
  }

  destroy() {
    window.removeEventListener("keyup", this.keyUp.bind(this));
    window.removeEventListener("keydown", this.keyDown.bind(this));

    window.removeEventListener("keyup", this.invisibleOff.bind(this));
    window.removeEventListener("keydown", this.invisibleOn.bind(this));
  }

  levelRegen() {
    this.health.current += s.player.levelRegen;

    if (this.health.current > this.health.max)
      this.health.current = this.health.max;

    Log(
      `${this.name} has ${this.health.current} health`,
      playerInvisible.toggled
    );
  }

  addWeapon() {
    if (this.weapons.length >= s.player.weapons) {
      Log(
        `"${this.weapons[0].name}" was removed from you`,
        weaponRemove.toggled
      );
      this.weapons.shift();
    }

    this.weapons.push(
      new Fist({ pos: this.pos, size: this.size, idx: this.weapons.length })
    );
    this.weapons.forEach((w, i) => w.updatePos(i));
    Log(
      `"${this.weapons[this.weapons.length - 1].name}" was added to you`,
      weaponAdd.toggled
    );
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
