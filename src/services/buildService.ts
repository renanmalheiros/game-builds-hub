import { GameId, Character, Build, GameData } from '../types';
import { ALL_GAME_DATA } from '../data/gameData';

export function getAllGames(): GameData[] {
  return ALL_GAME_DATA;
}

export function getGameById(id: GameId): GameData | undefined {
  return ALL_GAME_DATA.find(g => g.game.id === id);
}

export function getCharactersByGame(gameId: GameId): Character[] {
  const gameData = getGameById(gameId);
  return gameData?.characters ?? [];
}

export function getCharacterById(id: string): Character | undefined {
  for (const gameData of ALL_GAME_DATA) {
    const char = gameData.characters.find(c => c.id === id);
    if (char) return char;
  }
  return undefined;
}

export function getBuildsByCharacter(characterId: string): Build[] {
  for (const gameData of ALL_GAME_DATA) {
    const builds = gameData.builds.filter(b => b.characterId === characterId);
    if (builds.length > 0) return builds;
  }
  return [];
}

export function getBuildsByGame(gameId: GameId): Build[] {
  const gameData = getGameById(gameId);
  return gameData?.builds ?? [];
}

export function getTopBuilds(limit: number = 10): Build[] {
  const allBuilds = ALL_GAME_DATA.flatMap(gd => gd.builds);
  return allBuilds
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export function searchBuilds(query: string): Build[] {
  const q = query.toLowerCase();
  const allBuilds = ALL_GAME_DATA.flatMap(gd => gd.builds);
  return allBuilds.filter(b => {
    const char = getCharacterById(b.characterId);
    return (
      char?.name.toLowerCase().includes(q) ||
      b.title.toLowerCase().includes(q) ||
      b.role.toLowerCase().includes(q) ||
      b.description.toLowerCase().includes(q)
    );
  });
}

export function getBuildsByTier(tier: 'S' | 'A' | 'B'): Build[] {
  return ALL_GAME_DATA.flatMap(gd => gd.builds).filter(b => b.tier === tier);
}

export function getCharacterBuilds(characterId: string): Build[] {
  return ALL_GAME_DATA.flatMap(gd => gd.builds).filter(b => b.characterId === characterId);
}
