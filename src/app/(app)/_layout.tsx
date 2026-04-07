import { View, StatusBar, StyleSheet, Platform } from 'react-native';

// Dependencies
import { Tabs } from 'expo-router';
import { BlurView } from 'expo-blur';
import { useTheme } from 'styled-components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useUserConfigs } from '@stores/userConfigsStore';

// Icons
import { JeepIcon } from 'phosphor-react-native/src/icons/Jeep';
import { HeartIcon } from 'phosphor-react-native/src/icons/Heart';
import { CalendarCheckIcon } from 'phosphor-react-native/src/icons/CalendarCheck';
import { DotsThreeOutlineIcon } from 'phosphor-react-native/src/icons/DotsThreeOutline';

import { ThemeProps } from '@interfaces/theme';

export default function TabLayout() {
  const theme = useTheme() as ThemeProps;
  const { darkMode } = useUserConfigs();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.statusBar }}>
      <StatusBar
        translucent
        barStyle={darkMode ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
      />

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.text,
          tabBarStyle: {
            position: 'absolute',
            height: 56,
            bottom: Platform.OS === 'ios' ? 24 : 16, // Extra lift for iOS home indicator
            marginHorizontal: 20,
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            borderTopWidth: 0,
            borderRadius: 32,
            overflow: 'hidden',
          },
          sceneStyle: {
            backgroundColor: 'transparent',
          },
          tabBarBackground: () => (
            <BlurView
              intensity={darkMode ? 30 : 50}
              experimentalBlurMethod="dimezisBlurView"
              style={StyleSheet.absoluteFill}
            />
          ),
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Alugar',
            tabBarIcon: ({ size, color }) => <JeepIcon size={size} color={color} />,
            sceneStyle: {
              backgroundColor: 'transparent',
            },
          }}
        />
        <Tabs.Screen
          name="trips"
          options={{
            title: 'Reservas',
            tabBarIcon: ({ color }) => <CalendarCheckIcon color={color} />,
            sceneStyle: {
              backgroundColor: 'transparent',
            },
          }}
        />

        <Tabs.Screen
          name="favorites"
          options={{
            title: 'Favoritos',
            tabBarIcon: ({ color }) => <HeartIcon color={color} />,
            sceneStyle: {
              backgroundColor: 'transparent',
            },
          }}
        />

        <Tabs.Screen
          name="menu"
          options={{
            title: 'Menu',
            tabBarIcon: ({ size, color }) => <DotsThreeOutlineIcon size={size} color={color} />,
            sceneStyle: {
              backgroundColor: 'transparent',
            },
          }}
        />
      </Tabs>

      {insets.bottom > 0 && (
        <View
          style={{
            height: insets.bottom,
            backgroundColor: theme.colors.background,
          }}
        />
      )}
    </View>
  );
}
