import * as sMap from "./settings/map";
import makeFilters, { levelChange } from "./settings/filters";
import Events from "./utils/events";

import Log from "./utils/logger";
import FPS from "./utils/fps";

import dither from "./rendering/dither";
import Renderer from "./rendering/renderer";

import Zombie from "./creatures/zombie";
import Player from "./creatures/player";
import Ladder from "./entities/ladder";

[
  "WASD or Arrows to move",
  "Space to turn invisible",
  "- costs 3hp for 500ms",
  "Attacks are automatic",
  "",
].forEach((t) => Log(t, () => true));
makeFilters();

const mainRenderer = new Renderer(sMap.map.size);
const bgRenderer = new Renderer(sMap.map.size);

document.getElementById("c").prepend(mainRenderer.canvas);
document.getElementById(
  "sidebar"
).style.maxHeight = `${mainRenderer.canvas.height}px`;

const render = (time) => {
  window.cancelAnimationFrame(raf);

  bgRenderer.ctx.fillStyle = sMap.map.biome[map.currentBiome];
  bgRenderer.ctx.fillRect(0, 0, sMap.map.size, sMap.map.size);

  player.update(zombies, bgRenderer.ctx);
  zombies.forEach((z) =>
    z.update(player, bgRenderer.ctx, false && import.meta.env.DEV)
  );
  player.weapons.forEach((w) => w.render(bgRenderer.ctx));

  const dHalf = map.dither.size / 2;
  dither.square(bgRenderer.ctx, dHalf, player, map.dither.size);

  const dat = bgRenderer.ctx.getImageData(
    Math.min(player.pos.x - dHalf, player.pos.x),
    Math.min(player.pos.y - dHalf, player.pos.y),
    map.dither.size,
    map.dither.size
  );

  const dithered = dither.render(dat, dHalf);

  mainRenderer.ctx.clearRect(0, 0, sMap.map.size, sMap.map.size);
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
      map.dither.size -= level * 2;
      map.dither.size = Math.max(map.dither.size, sMap.map.dither.minSize);

      const n = Object.keys(sMap.map.biome);
      map.currentBiome = n[~~(Math.random() * n.length)];
      sMap.setBiome(map.currentBiome);

      Log("", () => true);
      player.levelRegen();
      player.addWeapon();
      Log(`${player.name} entered Lv. ${level}`, levelChange.toggled);

      const pure = document.getElementsByTagName("select-pure")[0];
      pure &&
        pure.setAttribute(
          "style",
          `--selected-background-color: ${map.biome[map.currentBiome]};`
        );
    });

    e.render(mainRenderer.ctx);
  });

  mainRenderer.ctx.fillStyle = `#fff`;
  mainRenderer.ctx.font = "12px monospace";
  mainRenderer.ctx.textAlign = "left";
  mainRenderer.ctx.fillText(`${FPS(time)} FPS`, 5, sMap.map.size - 5);

  mainRenderer.ctx.textAlign = "right";
  mainRenderer.ctx.fillText(
    `Level: ${level}`,
    sMap.map.size - 5,
    sMap.map.size - 5
  );

  raf = window.requestAnimationFrame(render);
};

let level;
let player;
let entities;
let zombies;
let raf;
let map;

const init = () => {
  map = { ...sMap.map };
  level = import.meta.env.DEV ? 10 : 0;

  sMap.setBiome(map.currentBiome);
  const pure = document.getElementsByTagName("select-pure")[0];
  pure &&
    pure.setAttribute(
      "style",
      `--selected-background-color: ${map.biome[map.currentBiome]};`
    );

  if (player) player.destroy();
  player = new Player();

  if (import.meta.env.DEV) new Array(4).fill(0).map(() => player.addWeapon());

  entities = new Array(~~(Math.random() * (level > 0 ? 3 : 1)) + 1)
    .fill(0)
    .map((_, i) => new Ladder(1 - i));
  zombies = new Array(level).fill(0).map(() => new Zombie());

  Events.on(`${player.name}-dead`, init);
  raf = window.requestAnimationFrame(render);
};
window.addEventListener("load", init);

Events.on(`creature-dead`, (name) => {
  if (name === player.name) {
    Events.emit(`${player.name}-dead`);
    Log("", () => true);
    return;
  }
});
