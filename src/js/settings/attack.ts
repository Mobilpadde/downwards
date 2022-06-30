const nouns: string[] = [
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

const adverbs: string[] = [
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

const noun = (): string => nouns[~~(Math.random() * nouns.length)];
const adverb = (): string => adverbs[~~(Math.random() * adverbs.length)];

export { noun, adverb };
