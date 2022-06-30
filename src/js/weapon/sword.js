import Melee from "./melee";
import * as sAttack from "../settings/attack";
import * as sWeapon from "../settings/weapon";
import { attackSword } from "../settings/filters";
import Log from "../utils/logger";

export default class Sword extends Melee {
  constructor({ pos, idx }) {
    super({
      ...sWeapon.sword,
      pos,
      idx,
      id: "sword",
      color: "#ff006e",
    });
  }

  attack(...a) {
    const o = super.attack(...a);
    if (o) {
      Log(
        `${this.name} ${sAttack.attack.adverb()} ${sAttack.attack.noun()} "${
          o.name
        }"`,
        attackSword.toggled
      );
    }
  }
}
