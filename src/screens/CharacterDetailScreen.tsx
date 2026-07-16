import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS, ELEMENT_COLORS, RARITY_COLORS } from '../theme';
import { BuildCard } from '../components/BuildCard';
import { getCharacterById, getCharacterBuilds } from '../services/buildService';

export function CharacterDetailScreen({ route, navigation }: any) {
  const { characterId } = route.params;
  const character = getCharacterById(characterId);
  const builds = getCharacterBuilds(characterId);

  if (!character) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Personagem não encontrado</Text>
      </View>
    );
  }

  const elementColor = ELEMENT_COLORS[character.element] || COLORS.textSecondary;
  const rarityColor = RARITY_COLORS[character.rarity] || COLORS.textSecondary;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.avatar, { borderColor: rarityColor }]}>
          <View style={[styles.avatarInner, { backgroundColor: elementColor + '30' }]}>
            <Text style={[styles.avatarText, { color: elementColor }]}>
              {character.name.charAt(0)}
            </Text>
          </View>
        </View>
        <Text style={styles.name}>{character.name}</Text>
        <View style={styles.tags}>
          <View style={[styles.elementTag, { backgroundColor: elementColor + '25' }]}>
            <Text style={[styles.elementText, { color: elementColor }]}>
              {character.element.charAt(0).toUpperCase() + character.element.slice(1)}
            </Text>
          </View>
          <View style={[styles.rarityTag, { backgroundColor: rarityColor + '25' }]}>
            <Text style={[styles.rarityText, { color: rarityColor }]}>
              ★ {character.rarity}★
            </Text>
          </View>
          {character.weaponType && (
            <View style={[styles.weaponTag]}>
              <Text style={styles.weaponText}>{character.weaponType}</Text>
            </View>
          )}
          {character.path && (
            <View style={[styles.pathTag]}>
              <Text style={styles.pathText}>{character.path}</Text>
            </View>
          )}
        </View>
      </View>

      <Text style={styles.sectionTitle}>Builds ({builds.length})</Text>
      <View style={styles.buildsContainer}>
        {builds.map((build) => (
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
    backgroundColor: COLORS.background,
  },
  error: {
    color: COLORS.danger,
    textAlign: 'center',
    marginTop: 100,
    fontSize: 16,
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 3,
    padding: 3,
    marginBottom: 12,
  },
  avatarInner: {
    flex: 1,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 40,
    fontWeight: '800',
  },
  name: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 12,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
  elementTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  elementText: {
    fontSize: 13,
    fontWeight: '600',
  },
  rarityTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  rarityText: {
    fontSize: 13,
    fontWeight: '600',
  },
  weaponTag: {
    backgroundColor: COLORS.surfaceLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  weaponText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  pathTag: {
    backgroundColor: COLORS.surfaceLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  pathText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    paddingHorizontal: 20,
    marginTop: 16,
    marginBottom: 12,
  },
  buildsContainer: {
    paddingHorizontal: 20,
  },
});
