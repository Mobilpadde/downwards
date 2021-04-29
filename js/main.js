import * as s from "./settings";

import Zombie from "./creatures/zombie";
import Player from "./creatures/player";

const c = document.getElementById("canvas");
c.width = s.map.size;
c.height = s.map.size;

const ctx = c.getContext("2d");

const zombies = new Array(3).fill(0).map(() => new Zombie());
const player = new Player();

const render = () => {
  ctx.fillStyle = s.map.biome.grass;
  ctx.fillRect(0, 0, s.map.size, s.map.size);

  player.attack(zombies);
  player.think();
  player.move();
  player.render(ctx);

  zombies.forEach((z) => {
    z.attack(player);
    z.think();
    z.follow(player);
    z.wander();
    z.render(ctx, true);
  });

  window.requestAnimationFrame(render);
};

window.requestAnimationFrame(render);
