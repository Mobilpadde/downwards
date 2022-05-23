const nouns = [
  "attacked",
  "slashed",
  "charged",
  "strafed",
  "striked",
  "abused",
  "punched",
  "censured",
  "berated",
];

const adverbs = [
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
];

const attack = {
  noun: () => nouns[~~(Math.random() * nouns.length)],
  adverb: () => adverbs[~~(Math.random() * adverbs.length)],
};

export { attack };
