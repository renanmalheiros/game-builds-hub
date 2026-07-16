import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, GAME_COLORS } from '../theme';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
  buildCount: number;
  onPress: () => void;
}

export function GameCard({ game, buildCount, onPress }: GameCardProps) {
  const gc = GAME_COLORS[game.id];
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: gc.gradient[0] }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{game.icon}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{game.shortName}</Text>
        <Text style={styles.subtitle}>{game.version}</Text>
        <Text style={styles.buildCount}>{buildCount} builds</Text>
      </View>
      <View style={[styles.accent, { backgroundColor: gc.primary }]} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 28,
  },
  info: {
    flex: 1,
    marginLeft: 14,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  buildCount: {
    fontSize: 13,
    color: COLORS.primaryLight,
    marginTop: 4,
  },
  accent: {
    width: 4,
    height: '120%',
    position: 'absolute',
    right: 0,
    top: -8,
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
  },
});
