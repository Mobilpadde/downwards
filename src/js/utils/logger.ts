import { getBiome, map } from "../settings/map";

import clock from "./clock";

const c = document.getElementById("console");

export default (text: string, toggled: () => boolean, time = clock()) => {
  if (!toggled()) return;

  const biome = map.biome[getBiome()];

  const line = document.createElement("li");
  line.innerHTML = `<span style="background: ${biome};">[ ${time} ]</span> ${text}`;

  if (c) {
    c.appendChild(line);
    c.scrollTop = c.scrollHeight + 16;
  }

  console.log(
    "%c%s%c %s",
    `color:white; background:${biome};`,
    `[ ${time} ]`,
    "color:inherit; background:inherit;",
    text
  );
};
