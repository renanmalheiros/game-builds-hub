import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, GAME_COLORS } from '../theme';
import { Build, GameId } from '../types';
import { getCharacterById } from '../services/buildService';

interface BuildCardProps {
  build: Build;
  onPress: () => void;
}

const TIER_COLORS = {
  S: COLORS.tierS,
  A: COLORS.tierA,
  B: COLORS.tierB,
};

export function BuildCard({ build, onPress }: BuildCardProps) {
  const character = getCharacterById(build.characterId);
  const tierColor = TIER_COLORS[build.tier];
  const gameColor = GAME_COLORS[build.gameId]?.primary || COLORS.primary;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <View style={styles.tierBadge}>
          <Text style={[styles.tierText, { color: tierColor }]}>{build.tier}</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.characterName}>{character?.name}</Text>
          <Text style={styles.title} numberOfLines={1}>{build.title}</Text>
        </View>
        <View style={[styles.scoreBadge, { backgroundColor: gameColor + '20' }]}>
          <Text style={[styles.scoreText, { color: gameColor }]}>{build.score}</Text>
        </View>
      </View>

      <View style={styles.info}>
        <View style={styles.roleBadge}>
          <Text style={styles.roleText}>{build.role}</Text>
        </View>
        <Text style={styles.lastUpdated}>Atualizado: {build.lastUpdated}</Text>
      </View>

      <View style={styles.weaponsRow}>
        {build.weapons.slice(0, 3).map((w) => (
          <View key={w.id} style={styles.weaponChip}>
            <Text style={styles.weaponName} numberOfLines={1}>{w.name}</Text>
            <Text style={[styles.weaponRarity, { color: w.rarity === 5 ? '#f97316' : '#fbbf24' }]}>
              {'★'.repeat(w.rarity)}
            </Text>
          </View>
        ))}
      </View>

      {build.tips.length > 0 && (
        <View style={styles.tipRow}>
          <Text style={styles.tipIcon}>💡</Text>
          <Text style={styles.tipText} numberOfLines={1}>{build.tips[0]}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tierBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  tierText: {
    fontSize: 18,
    fontWeight: '800',
  },
  titleContainer: {
    flex: 1,
  },
  characterName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  title: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  scoreBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  scoreText: {
    fontSize: 14,
    fontWeight: '700',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  roleBadge: {
    backgroundColor: COLORS.primary + '20',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  roleText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.primaryLight,
  },
  lastUpdated: {
    fontSize: 10,
    color: COLORS.textMuted,
  },
  weaponsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 10,
  },
  weaponChip: {
    backgroundColor: COLORS.surfaceLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    maxWidth: '48%',
  },
  weaponName: {
    fontSize: 11,
    color: COLORS.text,
    fontWeight: '500',
  },
  weaponRarity: {
    fontSize: 9,
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface + '80',
    borderRadius: 8,
    padding: 8,
    marginTop: 4,
  },
  tipIcon: {
    fontSize: 12,
    marginRight: 6,
  },
  tipText: {
    flex: 1,
    fontSize: 11,
    color: COLORS.textSecondary,
  },
});
