import * as s from "./settings";
import dither from "./dither";
import Log from "./logger";

import Renderer from "./renderer";

import Zombie from "./creatures/zombie";
import Player from "./creatures/player";
import Ladder from "./entities/ladder";

import { exported } from "./loadWasm";

const mainRenderer = new Renderer(s.map.size);
const bgRenderer = new Renderer(s.map.size);

document.getElementById("c").prepend(mainRenderer.canvas);

(async function () {
  const { dist } = await exported();

  let level = 0;

  let entities = new Array(~~(Math.random() * 3) + 1)
    .fill(0)
    .map((_, i) => new Ladder(1 - i));
  let zombies = [];
  const player = new Player();

  const render = () => {
    bgRenderer.ctx.fillStyle = s.map.biome[s.map.currentBiome];
    bgRenderer.ctx.fillRect(0, 0, s.map.size, s.map.size);

    player.attack(zombies, dist);
    player.think();
    player.move();
    player.render(bgRenderer.ctx);

    zombies.forEach((z) => {
      z.attack(player, dist);
      z.think(dist);
      z.follow(player, dist);
      z.wander();
      z.render(bgRenderer.ctx, true);
    });

    const dHalf = s.map.dither.size / 2;
    const dat = bgRenderer.ctx.getImageData(
      Math.min(player.pos.x - dHalf, player.pos.x),
      Math.min(player.pos.y - dHalf, player.pos.y),
      s.map.dither.size,
      s.map.dither.size
    );

    const dithered = dither.render(dat, dHalf, dist);

    mainRenderer.ctx.clearRect(0, 0, s.map.size, s.map.size);
    mainRenderer.ctx.putImageData(
      dithered,
      player.pos.x - dHalf,
      player.pos.y - dHalf
    );

    entities.forEach((e) => {
      e.trigger(
        player,
        () => {
          level += e.level;

          entities = new Array(~~(Math.random() * 3) + 1)
            .fill(0)
            .map((_, i) => new Ladder(1 - i));

          zombies = new Array(level).fill(0).map(() => new Zombie());
          s.map.dither.size -= level * 5;
          s.map.dither.size = Math.max(s.map.dither.size, s.map.dither.minSize);

          const n = Object.keys(s.map.biome);
          s.map.currentBiome = n[~~(Math.random() * n.length)];

          Log(`${player.name} entered Lv. ${level}`);
        },
        dist
      );

      e.render(mainRenderer.ctx);
    });

    mainRenderer.ctx.fillStyle = `#fff`;
    mainRenderer.ctx.font = "12px monospace";
    mainRenderer.ctx.textAlign = "right";
    mainRenderer.ctx.fillText(
      `Level: ${level}`,
      s.map.size - 5,
      s.map.size - 5
    );

    window.requestAnimationFrame(render);
  };

  window.requestAnimationFrame(render);
})();
