import Melee from "./melee";
import * as sAttack from "../settings/attack";
import * as sWeapon from "../settings/weapon";
import { attackFist } from "../settings/filters";
import Log from "../utils/logger";

export default class Fist extends Melee {
  constructor({ pos, idx }) {
    super({
      ...sWeapon.fist,
      pos,
      idx,
      id: "fist",
      color: "#b5838d",
    });
  }

  attack(...a) {
    const o = super.attack(...a);
    if (o) {
      Log(
        `${this.name} ${sAttack.attack.adverb()} ${sAttack.attack.noun()} "${
          o.name
        }"`,
        attackFist.toggled
      );
    }
  }
}
