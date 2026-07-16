import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../theme';

interface UpdateBannerProps {
  lastUpdate: string;
  nextUpdate: string;
  daysUntilUpdate: number;
  isUpdateDay: boolean;
}

export function UpdateBanner({ lastUpdate, nextUpdate, daysUntilUpdate, isUpdateDay }: UpdateBannerProps) {
  return (
    <View style={[styles.banner, isUpdateDay && styles.bannerActive]}>
      <View style={styles.row}>
        <Text style={styles.icon}>{isUpdateDay ? '🔄' : '📅'}</Text>
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            {isUpdateDay ? 'Atualização disponível!' : 'Próxima atualização'}
          </Text>
          <Text style={styles.subtitle}>
            {isUpdateDay
              ? 'Clique para atualizar as builds'
              : `Em ${daysUntilUpdate} dia${daysUntilUpdate !== 1 ? 's' : ''} (Terça-feira)`
            }
          </Text>
        </View>
      </View>
      <Text style={styles.date}>Última: {lastUpdate}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  bannerActive: {
    borderColor: COLORS.success + '40',
    backgroundColor: COLORS.success + '08',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  date: {
    fontSize: 10,
    color: COLORS.textMuted,
    marginTop: 8,
    textAlign: 'right',
  },
});
