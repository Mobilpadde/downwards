import * as s from "../settings";
import Vec from "../vec";

import Entity from "./entity";

export default class Ladder extends Entity {
  constructor(level) {
    super(new Vec(s.entity["1x1"].width, s.entity["1x1"].height), "#895836");

    this.level = level;
    if (level === 0) {
      this.level = 1;
    }
  }

  trigger(p, fn, dist) {
    if (super.trigger(p, dist)) fn();
  }
}