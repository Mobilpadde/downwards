import * as sCreature from "../settings/creature";
import { playerInvisible, weaponAdd, weaponRemove } from "../settings/filters";
import { sInvisibility } from "../settings/invisibility";

import Log from "../utils/logger";
import Creature from "./creature";

import Fist from "../weapon/fist";
import Sword from "../weapon/sword";

import Pistol from "../weapon/pistol";
import Smg from "../weapon/smg";

const weapons = [Fist, Sword, Pistol, Smg];

export default class Player extends Creature {
  constructor() {
    super({
      health: sCreature.player.health,
      damage: sCreature.player.damage,
      size: sCreature.player.size,
      vision: sCreature.player.vision,
      color: "rgba(45, 45, 45, 1)",
      id: "p",
      // sheet: "/static/person.png"
    });

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

    this.range = sCreature.creature.range;

    window.addEventListener("keyup", this.keyUp.bind(this));
    window.addEventListener("keydown", this.keyDown.bind(this));

    this.invisibilityInterval = null;
    this.updateInterval = null;

    this.weapons = [];
    this.addWeapon();
  }

  keyUp({ code }) {
    if (this.dead) return;
    this.keys[code] = false;
  }

  keyDown({ code }) {
    if (this.dead) return;
    this.keys[code] = true;
  }

  invisibility() {
    if (this.dead) return;

    if (this.keys.Space && !this.invisible) {
      Log(`${this.name} is invisible`, playerInvisible.toggled);

      this.invisible = true;
      this.invisibilityInterval = setTimeout(() => {
        this.invisible = false;
        this.takeDamage(sInvisibility.costs);
        Log(`${this.name} is visible`, playerInvisible.toggled);
      }, sInvisibility.time);
    }
  }

  destroy() {
    window.removeEventListener("keyup", this.keyUp.bind(this));
    window.removeEventListener("keydown", this.keyDown.bind(this));
  }

  levelRegen() {
    this.health.current += sCreature.player.levelRegen;

    if (this.health.current > this.health.max)
      this.health.current = this.health.max;

    Log(
      `${this.name} has ${this.health.current} health`,
      playerInvisible.toggled
    );
  }

  addWeapon() {
    if (this.weapons.length >= sCreature.player.weapons) {
      Log(
        `"${this.weapons[0].name}" was removed from you`,
        weaponRemove.toggled
      );
      this.weapons.shift();
    }

    this.weapons.push(
      new weapons[~~(Math.random() * weapons.length)]({
        pos: this.pos,
        size: this.size,
        idx: this.weapons.length,
      })
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

    if (this.invisible) {
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
      this.invisibility();
      this.think();
      this.move();

      this.weapons.forEach((w) => w.update(this.speed));
    }

    this.render(ctx);
  }
}
