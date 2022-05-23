import Melee from "./melee";
import * as s from "../settings";
import { attackFist } from "../settings/filters";
import Log from "../logger";

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
        `${this.name} ${s.attack.adverb()} ${s.attack.noun()} "${o.name}"`,
        attackFist.toggled
      );
    }
  }
}
