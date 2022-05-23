import Melee from "./melee";
import * as s from "../settings";

export default class Fist extends Melee {
  constructor({ pos, idx }) {
    super({
      pos,
      idx,
      id: "fist",
    });
  }
}
