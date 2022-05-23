import Melee from "./melee";
import * as sAttack from "../settings/attack";
import { attackFist } from "../settings/filters";
import Log from "../utils/logger";

export default class Fist extends Melee {
  constructor({ pos, idx }) {
    super({
      pos,
      idx,
      id: "fist",
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
