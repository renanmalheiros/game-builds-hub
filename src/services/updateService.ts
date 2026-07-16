import AsyncStorage from '@react-native-async-storage/async-storage';
import { GameData, AppData, UpdateLog, GameId } from '../types';
import { ALL_GAME_DATA } from '../data/gameData';

const STORAGE_KEYS = {
  APP_DATA: '@gamebuildshub/app_data',
  GAME_DATA: '@gamebuildshub/game_data',
  UPDATE_LOG: '@gamebuildshub/update_log',
  LAST_UPDATE_CHECK: '@gamebuildshub/last_update_check',
};

function getNextTuesday(): Date {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const daysUntilTuesday = (2 - dayOfWeek + 7) % 7 || 7;
  const next = new Date(now);
  next.setDate(now.getDate() + daysUntilTuesday);
  next.setHours(5, 0, 0, 0);
  return next;
}

function isTuesdayNow(): boolean {
  return new Date().getDay() === 2;
}

async function fetchLatestBuilds(gameId: GameId): Promise<GameData | null> {
  // In production, this would fetch from a real API:
  // const response = await fetch(`https://api.gamebuildshub.com/games/${gameId}/builds`);
  // return response.json();

  // Simulated API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const gameData = ALL_GAME_DATA.find(g => g.game.id === gameId);
  if (!gameData) return null;

  // Simulate updated data with current timestamp
  return {
    ...gameData,
    lastUpdated: new Date().toISOString().split('T')[0],
  };
}

export async function loadGameData(): Promise<GameData[]> {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEYS.GAME_DATA);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.warn('Failed to load stored game data:', e);
  }
  // Return initial data
  await saveGameData(ALL_GAME_DATA);
  return ALL_GAME_DATA;
}

export async function saveGameData(data: GameData[]): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.GAME_DATA, JSON.stringify(data));
  } catch (e) {
    console.warn('Failed to save game data:', e);
  }
}

export async function checkForUpdates(force: boolean = false): Promise<UpdateLog | null> {
  try {
    const lastCheck = await AsyncStorage.getItem(STORAGE_KEYS.LAST_UPDATE_CHECK);
    const now = new Date().toISOString();

    // Check if we already updated today (unless forced)
    if (!force && lastCheck) {
      const lastDate = new Date(lastCheck).toDateString();
      const todayDate = new Date().toDateString();
      if (lastDate === todayDate && isTuesdayNow()) {
        return null;
      }
    }

    // Only auto-update on Tuesdays (unless forced)
    if (!force && !isTuesdayNow()) {
      return null;
    }

    const currentData = await loadGameData();
    const updateLog: UpdateLog = {
      timestamp: now,
      gamesUpdated: [],
      buildsAdded: 0,
      buildsUpdated: 0,
    };

    const updatedData = await Promise.all(
      currentData.map(async (gd) => {
        const latest = await fetchLatestBuilds(gd.game.id);
        if (latest) {
          updateLog.gamesUpdated.push(gd.game.id);
          updateLog.buildsUpdated += latest.builds.length;
          return latest;
        }
        return gd;
      })
    );

    await saveGameData(updatedData);
    await AsyncStorage.setItem(STORAGE_KEYS.LAST_UPDATE_CHECK, now);
    await AsyncStorage.setItem(STORAGE_KEYS.UPDATE_LOG, JSON.stringify(updateLog));

    return updateLog;
  } catch (e) {
    console.warn('Update check failed:', e);
    return null;
  }
}

export async function getUpdateLog(): Promise<UpdateLog | null> {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEYS.UPDATE_LOG);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function getDaysUntilNextUpdate(): number {
  const now = new Date();
  const nextTuesday = getNextTuesday();
  const diff = nextTuesday.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function getAppData(): AppData {
  const nextUpdate = getNextTuesday();
  return {
    games: ALL_GAME_DATA,
    lastFullUpdate: new Date().toISOString().split('T')[0],
    nextScheduledUpdate: nextUpdate.toISOString(),
  };
}
