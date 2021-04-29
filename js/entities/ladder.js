import * as s from "../settings";
import Vec from "../vec";

import Entity from "./entity";

export default class Ladder extends Entity {
  constructor() {
    super(new Vec(s.entity["1x1"].width, s.entity["1x1"].height), "#895836");
  }

  trigger(p, fn) {
    if (super.trigger(p)) fn();
  }
}
