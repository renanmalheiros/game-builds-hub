import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS, ELEMENT_COLORS, GAME_COLORS } from '../theme';
import { getCharacterById } from '../services/buildService';
import { ALL_GAME_DATA } from '../data/gameData';
import { Build, GameId } from '../types';

const TIER_COLORS = {
  S: COLORS.tierS,
  A: COLORS.tierA,
  B: COLORS.tierB,
};

export function BuildDetailScreen({ route }: any) {
  const { buildId } = route.params;

  let build: Build | null = null;
  for (const gd of ALL_GAME_DATA) {
    const found = gd.builds.find(b => b.id === buildId);
    if (found) { build = found; break; }
  }

  if (!build) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Build não encontrada</Text>
      </View>
    );
  }

  const character = getCharacterById(build.characterId);
  const gameData = ALL_GAME_DATA.find(g => g.game.id === build.gameId);
  const tierColor = TIER_COLORS[build.tier];
  const gameColor = GAME_COLORS[build.gameId]?.primary || COLORS.primary;
  const elementColor = ELEMENT_COLORS[character?.element || ''] || COLORS.textSecondary;

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.header, { backgroundColor: gameColor + '15' }]}>
        <View style={styles.headerTop}>
          <View style={[styles.tierBadge, { borderColor: tierColor }]}>
            <Text style={[styles.tierText, { color: tierColor }]}>{build.tier}</Text>
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.characterName}>{character?.name}</Text>
            <Text style={styles.title}>{build.title}</Text>
          </View>
          <View style={[styles.scoreBadge, { backgroundColor: gameColor }]}>
            <Text style={styles.scoreValue}>{build.score}</Text>
          </View>
        </View>
        <Text style={styles.description}>{build.description}</Text>
        <View style={styles.metaRow}>
          <View style={styles.metaTag}>
            <Text style={styles.metaLabel}>Role</Text>
            <Text style={[styles.metaValue, { color: COLORS.primaryLight }]}>{build.role}</Text>
          </View>
          <View style={styles.metaTag}>
            <Text style={styles.metaLabel}>Game</Text>
            <Text style={[styles.metaValue, { color: gameColor }]}>{gameData?.game.shortName}</Text>
          </View>
          <View style={styles.metaTag}>
            <Text style={styles.metaLabel}>Elemento</Text>
            <Text style={[styles.metaValue, { color: elementColor }]}>
              {character?.element.charAt(0).toUpperCase() + (character?.element.slice(1) || '')}
            </Text>
          </View>
        </View>
      </View>

      {/* Weapons */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🗡️ Armas</Text>
        {build.weapons.map((weapon: any, i: number) => (
          <View key={weapon.id} style={styles.weaponItem}>
            <View style={styles.weaponRank}>
              <Text style={styles.weaponRankText}>{i + 1}</Text>
            </View>
            <View style={styles.weaponInfo}>
              <Text style={styles.weaponName}>{weapon.name}</Text>
              <Text style={styles.weaponType}>{weapon.type} • {'★'.repeat(weapon.rarity)}</Text>
              {weapon.refinement && (
                <Text style={styles.weaponRef}>{weapon.refinement}</Text>
              )}
            </View>
          </View>
        ))}
      </View>

      {/* Gear */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🛡️ Equipamento (Relics/Artifacts)</Text>
        {build.gear.map((gear: any) => (
          <View key={gear.id} style={styles.gearItem}>
            <View style={styles.gearHeader}>
              <Text style={styles.gearSlot}>
                {gear.slot === 'flower' ? '🌸' :
                  gear.slot === 'plume' ? '🪶' :
                  gear.slot === 'sands' ? '⏳' :
                  gear.slot === 'goblet' ? '🏆' :
                  gear.slot === 'circlet' ? '👑' :
                  gear.slot === 'cost1' ? '💎' :
                  gear.slot === 'cost3' ? '💠' : '🔶'}
              </Text>
              <View style={styles.gearInfo}>
                <Text style={styles.gearName}>{gear.set}</Text>
                <Text style={styles.gearMain}>{gear.mainStat}</Text>
              </View>
            </View>
            {gear.subStats && gear.subStats.length > 0 && (
              <View style={styles.subStats}>
                {gear.subStats.map((stat: string, i: number) => (
                  <Text key={i} style={styles.subStat}>• {stat}</Text>
                ))}
              </View>
            )}
          </View>
        ))}
      </View>

      {/* Stats Priority */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 Prioridade de Stats</Text>
        <View style={styles.statBox}>
          <Text style={styles.statBoxLabel}>Main Stats</Text>
          <Text style={styles.statBoxValue}>{build.stats.main}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statBoxLabel}>Sub Stats</Text>
          <Text style={styles.statBoxValue}>{build.stats.sub.join(' > ')}</Text>
        </View>
      </View>

      {/* Team Comp */}
      {build.teamComp && build.teamComp.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>👥 Time Composto</Text>
          <View style={styles.teamRow}>
            {build.teamComp.map((name: string, i: number) => (
              <View key={i} style={styles.teamMember}>
                <View style={[styles.teamAvatar, { backgroundColor: gameColor + '30' }]}>
                  <Text style={[styles.teamInitial, { color: gameColor }]}>
                    {name.charAt(0)}
                  </Text>
                </View>
                <Text style={styles.teamName}>{name}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Tips */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💡 Dicas</Text>
        {build.tips.map((tip: string, i: number) => (
          <View key={i} style={styles.tipItem}>
            <Text style={styles.tipNumber}>{i + 1}</Text>
            <Text style={styles.tipText}>{tip}</Text>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Última atualização: {build.lastUpdated}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  error: { color: COLORS.danger, textAlign: 'center', marginTop: 100, fontSize: 16 },
  header: { paddingTop: 60, paddingBottom: 20, paddingHorizontal: 20 },
  headerTop: { flexDirection: 'row', alignItems: 'center' },
  tierBadge: { width: 48, height: 48, borderRadius: 14, borderWidth: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.05)' },
  tierText: { fontSize: 24, fontWeight: '800' },
  headerInfo: { flex: 1, marginLeft: 14 },
  characterName: { fontSize: 22, fontWeight: '800', color: COLORS.text },
  title: { fontSize: 13, color: COLORS.textSecondary, marginTop: 2 },
  scoreBadge: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  scoreValue: { fontSize: 16, fontWeight: '800', color: COLORS.white },
  description: { fontSize: 13, color: COLORS.textSecondary, marginTop: 12, lineHeight: 18 },
  metaRow: { flexDirection: 'row', gap: 12, marginTop: 16 },
  metaTag: { flex: 1, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: 10, alignItems: 'center' },
  metaLabel: { fontSize: 10, color: COLORS.textMuted, marginBottom: 4 },
  metaValue: { fontSize: 13, fontWeight: '700' },
  section: { paddingHorizontal: 20, marginTop: 24 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: COLORS.text, marginBottom: 12 },
  weaponItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.card, borderRadius: 12, padding: 12, marginBottom: 8, borderWidth: 1, borderColor: COLORS.border },
  weaponRank: { width: 28, height: 28, borderRadius: 8, backgroundColor: COLORS.surfaceLight, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  weaponRankText: { fontSize: 13, fontWeight: '700', color: COLORS.primaryLight },
  weaponInfo: { flex: 1 },
  weaponName: { fontSize: 14, fontWeight: '600', color: COLORS.text },
  weaponType: { fontSize: 11, color: COLORS.textSecondary, marginTop: 2 },
  weaponRef: { fontSize: 11, color: COLORS.primaryLight, marginTop: 2 },
  gearItem: { backgroundColor: COLORS.card, borderRadius: 12, padding: 12, marginBottom: 8, borderWidth: 1, borderColor: COLORS.border },
  gearHeader: { flexDirection: 'row', alignItems: 'center' },
  gearSlot: { fontSize: 20, marginRight: 10 },
  gearInfo: { flex: 1 },
  gearName: { fontSize: 13, fontWeight: '600', color: COLORS.text },
  gearMain: { fontSize: 12, color: COLORS.primaryLight, marginTop: 2 },
  subStats: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8, paddingLeft: 30 },
  subStat: { fontSize: 11, color: COLORS.textSecondary },
  statBox: { backgroundColor: COLORS.card, borderRadius: 12, padding: 12, marginBottom: 8, borderWidth: 1, borderColor: COLORS.border },
  statBoxLabel: { fontSize: 11, color: COLORS.textMuted, marginBottom: 4 },
  statBoxValue: { fontSize: 13, color: COLORS.text, fontWeight: '500', lineHeight: 18 },
  teamRow: { flexDirection: 'row', gap: 16 },
  teamMember: { alignItems: 'center' },
  teamAvatar: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  teamInitial: { fontSize: 18, fontWeight: '700' },
  teamName: { fontSize: 11, color: COLORS.textSecondary, marginTop: 4 },
  tipItem: { flexDirection: 'row', backgroundColor: COLORS.card, borderRadius: 10, padding: 12, marginBottom: 8, borderWidth: 1, borderColor: COLORS.border },
  tipNumber: { width: 24, height: 24, borderRadius: 12, backgroundColor: COLORS.primary + '30', textAlign: 'center', lineHeight: 24, fontSize: 12, fontWeight: '700', color: COLORS.primaryLight, marginRight: 10, overflow: 'hidden' },
  tipText: { flex: 1, fontSize: 13, color: COLORS.textSecondary, lineHeight: 18 },
  footer: { alignItems: 'center', paddingVertical: 30, paddingBottom: 100 },
  footerText: { fontSize: 11, color: COLORS.textMuted },
});
