import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { AppNavigator } from './src/navigation/AppNavigator';
import { checkForUpdates, loadGameData } from './src/services/updateService';
import { COLORS } from './src/theme';

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function init() {
      await loadGameData();
      checkForUpdates();
      setReady(true);
    }
    init();
  }, []);

  if (!ready) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingIcon}>⚔️</Text>
        <Text style={styles.loadingText}>Game Builds Hub</Text>
        <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 16 }} />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <AppNavigator />
    </>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingIcon: {
    fontSize: 64,
  },
  loadingText: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.text,
    marginTop: 12,
  },
});
