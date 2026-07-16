export type GameId = 'genshin' | 'wuthering' | 'honkai' | 'neverness';

export type Element =
  | 'pyro' | 'hydro' | 'anemo' | 'electro' | 'dendro' | 'cryo' | 'geo'
  | 'fusion' | 'spectro' | 'aero' | 'havoc' | 'glacio'
  | 'physical' | 'imaginary' | 'quantum' | 'wind' | 'fire' | 'ice' | 'lightning' | 'dark' | 'neutral';

export type Rarity = 3 | 4 | 5;

export type ArtifactSlot =
  | 'flower' | 'plume' | 'sands' | 'goblet' | 'circlet'
  | 'cost1' | 'cost3' | 'cost4'
  | 'head' | 'hands' | 'body' | 'feet' | 'sphere' | 'rope'
  | 'accessory1' | 'accessory2' | 'accessory3';

export interface Game {
  id: GameId;
  name: string;
  shortName: string;
  color: string;
  gradient: [string, string];
  icon: string;
  version: string;
}

export interface Character {
  id: string;
  gameId: GameId;
  name: string;
  element: Element;
  rarity: Rarity;
  weaponType?: string;
  path?: string;
  region?: string;
  avatarUrl?: string;
}

export interface GearPiece {
  id: string;
  name: string;
  set: string;
  slot: ArtifactSlot;
  rarity: Rarity;
  mainStat?: string;
  subStats?: string[];
  iconUrl?: string;
}

export interface Weapon {
  id: string;
  name: string;
  type: string;
  rarity: Rarity;
  refinement?: string;
  description?: string;
  iconUrl?: string;
}

export interface Build {
  id: string;
  characterId: string;
  gameId: GameId;
  title: string;
  description: string;
  role: string;
  tier: 'S' | 'A' | 'B';
  weapons: Weapon[];
  gear: GearPiece[];
  stats: { main: string; sub: string[] };
  teamComp?: string[];
  tips: string[];
  score: number;
  lastUpdated: string;
}

export interface GameData {
  game: Game;
  characters: Character[];
  builds: Build[];
  lastUpdated: string;
}

export interface AppData {
  games: GameData[];
  lastFullUpdate: string;
  nextScheduledUpdate: string;
}

export interface UpdateLog {
  timestamp: string;
  gamesUpdated: GameId[];
  buildsAdded: number;
  buildsUpdated: number;
}
