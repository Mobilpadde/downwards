import Weapon from "./weapon";
import * as s from "../settings";

export default class Fist extends Weapon {
  constructor(o) {
    super({
      ...s.weapons.ranged,
      ...o,
    });
  }
}
