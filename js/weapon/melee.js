import * as sWeapon from "../settings/weapon";
import Weapon from "./weapon";

export default class Melee extends Weapon {
  constructor(o) {
    super({
      ...sWeapon.weapons.melee,
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

    if (this.cooldown > 0) return false;
    if (o) {
      this.cooldown = sWeapon.weapons.melee.cooldown;
      o.takeDamage(this.damage, this.name);

      return o;
    }

    return false;
  }
}
