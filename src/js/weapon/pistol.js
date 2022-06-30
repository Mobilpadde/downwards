import Ranged from "./ranged";
import { attack as sAttack } from "../settings/attack";
import * as sWeapon from "../settings/weapon";
import { attackPistol } from "../settings/filters";
import Log from "../utils/logger";

export default class Pistol extends Ranged {
  constructor({ pos, idx }) {
    super({
      ...sWeapon.pistol,
      pos,
      idx,
      id: "pistol",
      color: "#ff006e",
    });
  }

  attack(...a) {
    const o = super.attack(...a);
    if (o) {
      Log(
        `${this.name} ${sAttack.adverb()} ${sAttack.noun()} "${o.name}"`,
        attackPistol.toggled
      );
    }
  }
}
