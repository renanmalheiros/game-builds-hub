import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import { COLORS } from '../theme';
import { BuildCard } from '../components/BuildCard';
import { searchBuilds, getAllGames } from '../services/buildService';
import { Build, GameId } from '../types';
import { TouchableOpacity } from 'react-native';

const GAME_FILTERS: { id: GameId | 'all'; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'genshin', label: '🌅 Genshin' },
  { id: 'wuthering', label: '🌊 WuWa' },
  { id: 'honkai', label: '⭐ HSR' },
  { id: 'neverness', label: '♾️ NTE' },
];

const TIER_FILTERS = ['all', 'S', 'A', 'B'] as const;

export function SearchScreen({ navigation }: any) {
  const [query, setQuery] = useState('');
  const [gameFilter, setGameFilter] = useState<GameId | 'all'>('all');
  const [tierFilter, setTierFilter] = useState<'all' | 'S' | 'A' | 'B'>('all');

  let results: Build[] = query.length > 0 ? searchBuilds(query) : getAllGames().flatMap(gd => gd.builds);

  if (gameFilter !== 'all') {
    results = results.filter(b => b.gameId === gameFilter);
  }
  if (tierFilter !== 'all') {
    results = results.filter(b => b.tier === tierFilter);
  }

  results.sort((a, b) => b.score - a.score);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🔍 Buscar Builds</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar personagem, build, role..."
          placeholderTextColor={COLORS.textMuted}
          value={query}
          onChangeText={setQuery}
        />
      </View>

      <View style={styles.filters}>
        <Text style={styles.filterLabel}>Jogo:</Text>
        <View style={styles.filterRow}>
          {GAME_FILTERS.map((gf) => (
            <TouchableOpacity
              key={gf.id}
              style={[styles.filterChip, gameFilter === gf.id && styles.filterChipActive]}
              onPress={() => setGameFilter(gf.id)}
            >
              <Text style={[styles.filterChipText, gameFilter === gf.id && styles.filterChipTextActive]}>
                {gf.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.filters}>
        <Text style={styles.filterLabel}>Tier:</Text>
        <View style={styles.filterRow}>
          {TIER_FILTERS.map((tf) => (
            <TouchableOpacity
              key={tf}
              style={[styles.tierChip, tierFilter === tf && styles.tierChipActive]}
              onPress={() => setTierFilter(tf)}
            >
              <Text style={[styles.tierChipText, tierFilter === tf && styles.tierChipTextActive]}>
                {tf === 'all' ? 'Todos' : `Tier ${tf}`}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Text style={styles.resultCount}>{results.length} builds encontradas</Text>

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BuildCard
            build={item}
            onPress={() => navigation.navigate('BuildDetail', { buildId: item.id })}
          />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 12,
  },
  searchInput: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filters: {
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  filterLabel: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginBottom: 6,
    fontWeight: '600',
  },
  filterRow: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
  },
  filterChip: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterChipText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: COLORS.white,
  },
  tierChip: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tierChipActive: {
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.primaryLight,
  },
  tierChipText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  tierChipTextActive: {
    color: COLORS.white,
  },
  resultCount: {
    fontSize: 12,
    color: COLORS.textMuted,
    paddingHorizontal: 20,
    marginVertical: 8,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
});
