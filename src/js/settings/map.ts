enum Biomes {
  Grass = "grass",
  Ground = "ground",
  Stone = "stone",
}

interface Biome {
  [Biomes.Grass]: string;
  [Biomes.Ground]: string;
  [Biomes.Stone]: string;
}

interface Dither {
  size: number;
  minSize: number;
}

interface Map {
  size: number;
  dither: Dither;

  biome: Biome;
  currentBiome: Biomes;
}

const map: Map = {
  size: 640,
  dither: {
    size: 512,
    minSize: 168,
  },

  biome: {
    [Biomes.Grass]: "#048b67",
    [Biomes.Ground]: "#41413f",
    [Biomes.Stone]: "#2b2d42",
  },
  currentBiome: Biomes.Grass,
};

interface Entities {
  width: number;
  height: number;
}

interface Entiity {
  "1x1": Entities;
}

const entity: Entiity = {
  "1x1": {
    width: 16,
    height: 16,
  },
};

let biome = map.currentBiome;
let getBiome = (): Biomes => biome;
let setBiome = (b: Biomes): void => {
  biome = b;
};

export { map, entity, getBiome, setBiome };
