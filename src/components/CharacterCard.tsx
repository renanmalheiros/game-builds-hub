import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, ELEMENT_COLORS, RARITY_COLORS } from '../theme';
import { Character } from '../types';

interface CharacterCardProps {
  character: Character;
  onPress: () => void;
}

export function CharacterCard({ character, onPress }: CharacterCardProps) {
  const elementColor = ELEMENT_COLORS[character.element] || COLORS.textSecondary;
  const rarityColor = RARITY_COLORS[character.rarity] || COLORS.textSecondary;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.avatar, { borderColor: rarityColor }]}>
        <View style={[styles.avatarInner, { backgroundColor: elementColor + '30' }]}>
          <Text style={[styles.initial, { color: elementColor }]}>
            {character.name.charAt(0)}
          </Text>
        </View>
      </View>
      <Text style={styles.name} numberOfLines={1}>{character.name}</Text>
      <View style={styles.tags}>
        <View style={[styles.tag, { backgroundColor: elementColor + '25' }]}>
          <Text style={[styles.tagText, { color: elementColor }]}>
            {character.element.charAt(0).toUpperCase() + character.element.slice(1)}
          </Text>
        </View>
        {character.rarity === 5 && (
          <View style={[styles.rarityTag, { backgroundColor: rarityColor + '25' }]}>
            <Text style={[styles.rarityText, { color: rarityColor }]}>
              ★ {character.rarity}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 90,
    alignItems: 'center',
    marginRight: 12,
    paddingVertical: 8,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    padding: 2,
    marginBottom: 6,
  },
  avatarInner: {
    flex: 1,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initial: {
    fontSize: 24,
    fontWeight: '700',
  },
  name: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  tags: {
    flexDirection: 'row',
    gap: 4,
  },
  tag: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 9,
    fontWeight: '600',
  },
  rarityTag: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  rarityText: {
    fontSize: 9,
    fontWeight: '600',
  },
});
