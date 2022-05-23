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
  range: 80,
};

const weapons = {
  melee,
  ranged,
};

const attack = {
  noun: () =>
    [
      "attacked",
      "slashed",
      "charged",
      "strafed",
      "striked",
      "abused",
      "punched",
      "censured",
      "berated",
    ][~~(Math.random() * 9)],

  adverb: () =>
    [
      "boldly",
      "actually",
      "physically",
      "mentally",
      "violently",
      "vigorously",
      "generally",
      "rarely",
      "aggressively",
      "verbally",
      "suddenly",
      "proudly",
    ][~~(Math.random() * 12)],
};

export { creature, player, attack, weapons };
