import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import { COLORS } from '../theme';
import { HomeScreen } from '../screens/HomeScreen';
import { GameDetailScreen } from '../screens/GameDetailScreen';
import { CharacterDetailScreen } from '../screens/CharacterDetailScreen';
import { BuildDetailScreen } from '../screens/BuildDetailScreen';
import { SearchScreen } from '../screens/SearchScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.background },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="GameDetail" component={GameDetailScreen} />
      <Stack.Screen name="CharacterDetail" component={CharacterDetailScreen} />
      <Stack.Screen name="BuildDetail" component={BuildDetailScreen} />
    </Stack.Navigator>
  );
}

function GameStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.background },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="GameDetail" component={GameDetailScreen} />
      <Stack.Screen name="CharacterDetail" component={CharacterDetailScreen} />
      <Stack.Screen name="BuildDetail" component={BuildDetailScreen} />
    </Stack.Navigator>
  );
}

function SearchStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.background },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="SearchMain" component={SearchScreen} />
      <Stack.Screen name="BuildDetail" component={BuildDetailScreen} />
      <Stack.Screen name="CharacterDetail" component={CharacterDetailScreen} />
    </Stack.Navigator>
  );
}

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: COLORS.surface,
            borderTopColor: COLORS.border,
            borderTopWidth: 1,
            height: 80,
            paddingBottom: 20,
            paddingTop: 8,
          },
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.textMuted,
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '600',
          },
        }}
      >
        <Tab.Screen
          name="HomeTab"
          component={HomeStack}
          options={{
            tabBarLabel: 'Início',
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 22, color }}>🏠</Text>,
          }}
        />
        <Tab.Screen
          name="GameTab"
          component={GameStack}
          options={{
            tabBarLabel: 'Jogos',
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 22, color }}>🎮</Text>,
          }}
        />
        <Tab.Screen
          name="SearchTab"
          component={SearchStack}
          options={{
            tabBarLabel: 'Buscar',
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 22, color }}>🔍</Text>,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
