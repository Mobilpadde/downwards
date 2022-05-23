import * as s from "./settings";
import makeFilters, { levelChange } from "./settings/filters";
import Events from "./events";

import Log from "./logger";
import FPS from "./fps";

import dither from "./dither";
import Renderer from "./renderer";

import Zombie from "./creatures/zombie";
import Player from "./creatures/player";
import Ladder from "./entities/ladder";

makeFilters();

const mainRenderer = new Renderer(s.map.size);
const bgRenderer = new Renderer(s.map.size);

document.getElementById("c").prepend(mainRenderer.canvas);

const render = () => {
  bgRenderer.ctx.fillStyle = s.map.biome[s.map.currentBiome];
  bgRenderer.ctx.fillRect(0, 0, s.map.size, s.map.size);

  player.update(zombies, bgRenderer.ctx);
  zombies.forEach((z) =>
    z.update(player, bgRenderer.ctx, false && import.meta.env.DEV)
  );

  const dHalf = s.map.dither.size / 2;
  dither.square(bgRenderer.ctx, dHalf, player, s.map.dither.size);

  const dat = bgRenderer.ctx.getImageData(
    Math.min(player.pos.x - dHalf, player.pos.x),
    Math.min(player.pos.y - dHalf, player.pos.y),
    s.map.dither.size,
    s.map.dither.size
  );

  const dithered = dither.render(dat, dHalf);

  mainRenderer.ctx.clearRect(0, 0, s.map.size, s.map.size);
  mainRenderer.ctx.putImageData(
    dithered,
    player.pos.x - dHalf,
    player.pos.y - dHalf
  );

  entities.forEach((e) => {
    e.trigger(player, () => {
      level += e.level;

      entities = new Array(~~(Math.random() * 3) + 1)
        .fill(0)
        .map((_, i) => new Ladder(1 - i));

      zombies = new Array(level).fill(0).map(() => new Zombie());
      s.map.dither.size -= level * 5;
      s.map.dither.size = Math.max(s.map.dither.size, s.map.dither.minSize);

      const n = Object.keys(s.map.biome);
      s.map.currentBiome = n[~~(Math.random() * n.length)];

      player.addWeapon();
      player.levelRegen();
      Log(`${player.name} entered Lv. ${level}`, levelChange.toggled);
    });

    e.render(mainRenderer.ctx);
  });

  mainRenderer.ctx.fillStyle = `#fff`;
  mainRenderer.ctx.font = "12px monospace";
  mainRenderer.ctx.textAlign = "left";
  mainRenderer.ctx.fillText(`${FPS()} FPS`, 5, s.map.size - 5);

  mainRenderer.ctx.textAlign = "right";
  mainRenderer.ctx.fillText(`Level: ${level}`, s.map.size - 5, s.map.size - 5);

  raf = window.requestAnimationFrame(render);
};

let level;
let player;
let entities;
let zombies;
let raf = null;

const init = () => {
  if (!!raf) window.cancelAnimationFrame(raf);

  level = import.meta.env.DEV ? 10 : 0;

  if (player) player.destroy();
  player = new Player();
  entities = new Array(~~(Math.random() * (level > 0 ? 3 : 1)) + 1)
    .fill(0)
    .map((_, i) => new Ladder(1 - i));
  zombies = new Array(level).fill(0).map(() => new Zombie());

  s.map.currentBiome = "grass";
  s.map.dither.size = 512;

  Events.on(`${player.name}-dead`, init);
  raf = window.requestAnimationFrame(render);
};
window.addEventListener("load", init);

Events.on(`creature-dead`, (name) => {
  if (name === player.name) {
    Events.emit(`${player.name}-dead`);
    return;
  }
});
