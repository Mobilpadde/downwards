import * as s from "./settings";
import Log from "./logger";

import Zombie from "./creatures/zombie";
import Player from "./creatures/player";
import Ladder from "./entities/ladder";

const c = document.getElementById("canvas");
c.width = s.map.size;
c.height = s.map.size;

const ctx = c.getContext("2d");

let level = 0;

let entities = new Array(~~(Math.random() * 3) + 1)
  .fill(0)
  .map((_, i) => new Ladder(1 - i));
let zombies = [];
const player = new Player();

const render = () => {
  ctx.fillStyle = s.map.biome[s.map.currentBiome];
  ctx.fillRect(0, 0, s.map.size, s.map.size);

  entities.forEach((e) => {
    e.trigger(player, () => {
      entities = new Array(~~(Math.random() * 3) + 1)
        .fill(0)
        .map((_, i) => new Ladder(1 - i));

      zombies = new Array(level + 1).fill(0).map(() => new Zombie());

      const n = Object.keys(s.map.biome);
      s.map.currentBiome = n[~~(Math.random() * n.length)];

      level += e.level;
      Log(`${player.name} entered Lv. ${level}`);
    });

    e.render(ctx);
  });

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

  ctx.fillStyle = `#fff`;
  ctx.font = "12px monospace";
  ctx.textAlign = "right";
  ctx.fillText(`Level: ${level}`, s.map.size - 5, s.map.size - 5);

  window.requestAnimationFrame(render);
};

window.requestAnimationFrame(render);
