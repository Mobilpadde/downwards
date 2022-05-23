const weapon = {
  size: 8,
  range: 64,
  speed: 1.25,
  cooldown: 100,
  damage: 5,
};

const melee = {
  ...weapon,
  cooldown: 75,
};

const fist = {
  ...melee,
  speed: 1.75,
};

const sword = {
  ...melee,
  speed: 1.5,
  damage: 7,
};

const ranged = {
  ...weapon,
  range: 96,
};

const pistol = {
  ...ranged,
  range: 102,
  damage: 6,
};

const smg = {
  ...ranged,
  damage: 7,
};

export { melee, fist, sword, ranged, pistol, smg };
