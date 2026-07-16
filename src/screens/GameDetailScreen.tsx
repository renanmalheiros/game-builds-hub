import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { COLORS, GAME_COLORS, ELEMENT_COLORS } from '../theme';
import { CharacterCard } from '../components/CharacterCard';
import { BuildCard } from '../components/BuildCard';
import { getGameById, getCharactersByGame, getBuildsByGame } from '../services/buildService';
import { GameId } from '../types';

export function GameDetailScreen({ route, navigation }: any) {
  const { gameId } = route.params as { gameId: GameId };
  const gameData = getGameById(gameId);
  const characters = getCharactersByGame(gameId);
  const builds = getBuildsByGame(gameId);
  const gc = GAME_COLORS[gameId];

  if (!gameData) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Jogo não encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: COLORS.background }]}>
      <View style={[styles.header, { backgroundColor: gc.gradient[0] }]}>
        <Text style={styles.gameIcon}>{gameData.game.icon}</Text>
        <Text style={styles.gameName}>{gameData.game.name}</Text>
        <Text style={styles.version}>Versão {gameData.game.version}</Text>
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{characters.length}</Text>
            <Text style={styles.statLabel}>Personagens</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{builds.length}</Text>
            <Text style={styles.statLabel}>Builds</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{builds.filter(b => b.tier === 'S').length}</Text>
            <Text style={styles.statLabel}>Tier S</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Personagens</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.charactersRow}
      >
        {characters.map((char) => (
          <CharacterCard
            key={char.id}
            character={char}
            onPress={() => navigation.navigate('CharacterDetail', { characterId: char.id })}
          />
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Melhores Builds</Text>
      <View style={styles.buildsContainer}>
        {builds
          .sort((a, b) => b.score - a.score)
          .map((build) => (
            <BuildCard
              key={build.id}
              build={build}
              onPress={() => navigation.navigate('BuildDetail', { buildId: build.id })}
            />
          ))}
      </View>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  error: {
    color: COLORS.danger,
    textAlign: 'center',
    marginTop: 100,
    fontSize: 16,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  gameIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  gameName: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.text,
  },
  version: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 32,
    marginTop: 20,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.primaryLight,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 12,
  },
  charactersRow: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  buildsContainer: {
    paddingHorizontal: 20,
  },
});
