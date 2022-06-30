type Sprite = {
  size: number;
  resize: number;
};

type Creature = {
  size: number;
  vision: number;
  range: number;

  health: number;
  damage: number;
  cooldown: number;

  sprite: Sprite;
};

const creature: Creature = {
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

type Player = Creature & {
  health: number;
  weapons: number;
  levelRegen: number;
};

const player: Player = {
  ...creature,
  health: 50,
  weapons: 4,
  levelRegen: 5,
};

export { creature, player };
