import * as s from "../settings/settings";
import * as sMap from "../settings/map";
import Vec from "../utils/vec";

export default class Sprite {
  constructor({ size, color, sheet }) {
    this.size = size;
    this.color = color;
    this.sheet = sheet;

    this.pos = Vec.random(
      size,
      sMap.map.size - size,
      size,
      sMap.map.size - size
    );

    if (!!sheet) {
      this.sheetIdx = 0;
      this.image = null;
      setTimeout(() => this.loadSheet(), 1);
    }
  }

  loadSheet() {
    const img = new Image();

    img.src = "/static/person.png";
    img.onload = () => {
      this.image = img;
      this.sheetSize = img.naturalWidth / s.creature.sprite.size;
    };
  }

  updateSheet() {
    this.sheetIdx++;
    this.sheetIdx %= this.sheetSize;
  }

  render(ctx) {
    if (!this.image) return;

    ctx.drawImage(
      this.image,
      s.creature.sprite.size * this.sheetIdx,
      0,
      s.creature.sprite.size,
      s.creature.sprite.size,
      this.pos.x - s.creature.sprite.resize / 2,
      this.pos.y - s.creature.sprite.resize / 2,
      s.creature.sprite.resize,
      s.creature.sprite.resize
    );
  }
}
