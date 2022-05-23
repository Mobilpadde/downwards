import * as s from "../settings";
import Weapon from "./weapon";
import Log from "../logger";

export default class Melee extends Weapon {
  constructor(o) {
    super({
      ...s.weapons.melee,
      ...o,
    });
  }

  attack(others, pos) {
    const o = others.find(
      (o) =>
        !o.dead &&
        o.pos.distSq(pos) < this.range * this.range + this.size * o.size
    );
    if (o) {
      this.dream = o.pos.clone();
    } else {
      const { x, y } = this.posAddition;
      this.dream = pos.clone().add(x, y);
    }

    if (this.cooldown > 0) return;
    if (o) {
      Log(`${this.name} ${s.attack.adverb()} ${s.attack.noun()} "${o.name}"`);
      this.cooldown = s.weapons.melee.cooldown;
      o.takeDamage(this.damage, this.name);
    }
  }
}
