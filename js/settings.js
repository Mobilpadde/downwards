const map = {
  size: 512,
  biome: {
    grass: "#2ea043",
  },
};

const creature = {
  size: 8,
  vision: 32,
  range: 8,
  cooldown: 100,
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

export { map, creature, attack };
