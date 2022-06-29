import { getBiome, map } from "../settings/map";

import clock from "./clock";

const c = document.getElementById("console");

export default (text, toggled, time = clock()) => {
  if (!toggled) return;

  const line = document.createElement("li");
  line.innerHTML = `<span style="background: ${
    map.biome[getBiome()]
  };">[ ${time} ]</span> ${text}`;

  c.appendChild(line);
  c.scrollTop = c.scrollHeight + 16;

  console.log(
    "%c%s%c %s",
    `color:white; background:${map.biome[getBiome()]};`,
    `[ ${time} ]`,
    "color:inherit; background:inherit;",
    text
  );
};
