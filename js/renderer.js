let idx = 0;

export default class Renderer {
  constructor(size) {
    this.c = document.createElement("canvas");
    this.c.id = `c_${idx++}`;

    this.c.width = size;
    this.c.height = size;
  }

  get canvas() {
    return this.c;
  }

  get ctx() {
    return this.c.getContext("2d");
  }
}
