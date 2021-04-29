const map = {
  size: 512,
  sky: "#cce9f6",
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
      "berate",
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
    ][~~(Math.random() * 11)],
};

export { map, creature, attack };
