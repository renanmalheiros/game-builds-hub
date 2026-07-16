import { GameId } from '../types';

export const COLORS = {
  background: '#0f0f1a',
  surface: '#1a1a2e',
  surfaceLight: '#242444',
  card: '#1e1e3a',
  primary: '#7c3aed',
  primaryLight: '#a78bfa',
  accent: '#06b6d4',
  text: '#f1f5f9',
  textSecondary: '#94a3b8',
  textMuted: '#64748b',
  border: '#2e2e4a',
  success: '#22c55e',
  warning: '#f59e0b',
  danger: '#ef4444',
  tierS: '#fbbf24',
  tierA: '#a78bfa',
  tierB: '#60a5fa',
  white: '#ffffff',
  black: '#000000',
};

export const GAME_COLORS: Record<GameId, { primary: string; gradient: [string, string] }> = {
  genshin: { primary: '#e8b04a', gradient: ['#2d1b00', '#1a1100'] },
  wuthering: { primary: '#38bdf8', gradient: ['#0c1929', '#0a1628'] },
  honkai: { primary: '#f472b6', gradient: ['#2d0a1e', '#1a0612'] },
  neverness: { primary: '#34d399', gradient: ['#0a2920', '#061a14'] },
};

export const ELEMENT_COLORS: Record<string, string> = {
  pyro: '#ef4444',
  hydro: '#3b82f6',
  anemo: '#22c55e',
  electro: '#a855f7',
  dendro: '#16a34a',
  cryo: '#67e8f9',
  geo: '#f59e0b',
  fusion: '#f97316',
  spectro: '#fbbf24',
  aero: '#38bdf8',
  havoc: '#dc2626',
  glacio: '#93c5fd',
  physical: '#94a3b8',
  imaginary: '#fde047',
  quantum: '#7c3aed',
  wind: '#22c55e',
  fire: '#ef4444',
  ice: '#67e8f9',
  lightning: '#a855f7',
  dark: '#1e1b4b',
  neutral: '#94a3b8',
};

export const RARITY_COLORS: Record<number, string> = {
  3: '#a78bfa',
  4: '#fbbf24',
  5: '#f97316',
};
