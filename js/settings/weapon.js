const weapon = {
  size: 8,
  range: 64,
  speed: 1.25,
  cooldown: 100,
  damage: 5,
};

const melee = {
  ...weapon,
  cooldown: weapon.cooldown - 15,
};

const fist = {
  ...melee,
  speed: melee.speed + 0.5,
};

const sword = {
  ...melee,
  speed: melee.speed + 0.25,
  damage: melee.damage + 2,
};

const ranged = {
  ...weapon,
  range: weapon.range + 32,
};

const pistol = {
  ...ranged,
  range: ranged.range + 64,
  damage: ranged.damage + 1,
};

const smg = {
  ...ranged,
  damage: ranged.damage + 2,
};

export { melee, fist, sword, ranged, pistol, smg };
