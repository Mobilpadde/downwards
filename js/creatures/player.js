import Log from "../logger";
import * as s from "../settings";

import Creature from "./creature";

export default class Player extends Creature {
  constructor() {
    super(s.creature.size, s.creature.vision, "rgba(45, 45, 45, 1)", "p");

    this.speed = 1.25;
    this.invisible = false;
    this.keys = {
      KeyW: false,
      KeyS: false,
      KeyA: false,
      KeyD: false,
      ArrowUp: false,
      ArrowDown: false,
      ArrowLeft: false,
      ArrowRight: false,
      Space: false,
    };

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
  }

  think() {
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
  }
}
