const creature = {
  size: 8,
  vision: 72,
  range: 16,

  health: 100,
  damage: 10,
  cooldown: 100,

  sprite: {
    size: 32,
    resize: 24,
  },
};

const player = {
  ...creature,
  health: 50,
  weapons: 4,
  levelRegen: 5,
};

export { creature, player };
