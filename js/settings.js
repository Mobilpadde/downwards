const map = {
  size: 640,
  biome: {
    grass: "#048b67",
    ground: "#41413f",
    stone: "#2b2d42",
  },
  currentBiome: "grass",

  dither: {
    size: 512,
    minSize: 96,
  },
};

const entity = {
  "1x1": {
    width: 16,
    height: 16,
  },
};

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
  cooldown: 50,
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

export { map, creature, player, entity, attack, weapons };
