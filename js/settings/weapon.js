const weapon = {
  size: 8,
  range: 64,
  speed: 1.25,
  cooldown: 100,
  damage: 5,
};

const melee = {
  ...weapon,
  speed: 1.75,
  cooldown: 75,
};

const ranged = {
  ...weapon,
  range: 96,
};

const weapons = {
  melee,
  ranged,
};

export { weapons };
