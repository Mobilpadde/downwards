import Ranged from "./ranged";
import { attack as sAttack } from "../settings/attack";
import * as sWeapon from "../settings/weapon";
import { attackSmg } from "../settings/filters";
import Log from "../utils/logger";

export default class Smg extends Ranged {
  constructor({ pos, idx }) {
    super({
      ...sWeapon.smg,
      pos,
      idx,
      id: "smg",
      color: "#00f5d4",
    });
  }

  attack(...a) {
    const o = super.attack(...a);
    if (o) {
      Log(
        `${this.name} ${sAttack.adverb()} ${sAttack.noun()} "${o.name}"`,
        attackSmg.toggled
      );
    }
  }
}
