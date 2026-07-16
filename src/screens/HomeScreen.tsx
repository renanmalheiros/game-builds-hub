import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { COLORS } from '../theme';
import { GameCard } from '../components/GameCard';
import { BuildCard } from '../components/BuildCard';
import { UpdateBanner } from '../components/UpdateBanner';
import { getAllGames, getTopBuilds } from '../services/buildService';
import { checkForUpdates, getDaysUntilNextUpdate } from '../services/updateService';

export function HomeScreen({ navigation }: any) {
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState('2026-07-15');
  const [isUpdateDay, setIsUpdateDay] = useState(false);
  const daysUntil = getDaysUntilNextUpdate();
  const games = getAllGames();
  const topBuilds = getTopBuilds(5);

  useEffect(() => {
    const today = new Date().getDay();
    setIsUpdateDay(today === 2);
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const result = await checkForUpdates();
    if (result) {
      setLastUpdate(result.timestamp.split('T')[0]);
    }
    setRefreshing(false);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.logo}>⚔️ Game Builds Hub</Text>
        <Text style={styles.subtitle}>Melhores builds de todos os jogos</Text>
      </View>

      <UpdateBanner
        lastUpdate={lastUpdate}
        nextUpdate=""
        daysUntilUpdate={daysUntil}
        isUpdateDay={isUpdateDay}
      />

      <Text style={styles.sectionTitle}>🎮 Jogos</Text>
      {games.map((gd) => (
        <GameCard
          key={gd.game.id}
          game={gd.game}
          buildCount={gd.builds.length}
          onPress={() => navigation.navigate('GameTab', {
            screen: 'GameDetail',
            params: { gameId: gd.game.id },
          })}
        />
      ))}

      <View style={styles.divider} />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>🏆 Top Builds</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SearchTab')}>
          <Text style={styles.seeAll}>Ver todas →</Text>
        </TouchableOpacity>
      </View>
      {topBuilds.map((build) => (
        <BuildCard
          key={build.id}
          build={build}
          onPress={() => navigation.navigate('BuildDetail', { buildId: build.id })}
        />
      ))}

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Dados atualizados toda terça-feira às 05:00
        </Text>
        <Text style={styles.footerVersion}>v1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  logo: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 20,
  },
  seeAll: {
    fontSize: 13,
    color: COLORS.primaryLight,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 20,
    marginHorizontal: 20,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingBottom: 100,
  },
  footerText: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  footerVersion: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 4,
  },
});
