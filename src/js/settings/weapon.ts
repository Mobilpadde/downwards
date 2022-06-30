type Weapon = {
  size: number;
  range: number;
  speed: number;
  cooldown: number;
  damage: number;
};

const weapon: Weapon = {
  size: 8,
  range: 64,
  speed: 1.25,
  cooldown: 85,
  damage: 5,
};

const melee: Weapon = {
  ...weapon,
  cooldown: weapon.cooldown - 15,
};

const fist: Weapon = {
  ...melee,
  speed: melee.speed + 0.5,
};

const sword: Weapon = {
  ...melee,
  speed: melee.speed + 0.25,
  damage: melee.damage + 2,
};

const ranged: Weapon = {
  ...weapon,
  range: weapon.range + 32,
};

const pistol: Weapon = {
  ...ranged,
  range: ranged.range + 64,
  damage: ranged.damage + 1,
};

const smg: Weapon = {
  ...ranged,
  damage: ranged.damage + 2,
};

export { melee, fist, sword, ranged, pistol, smg };
