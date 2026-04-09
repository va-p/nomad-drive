import { View, StatusBar } from 'react-native';
import { Stack } from 'expo-router';
import { useTheme } from 'styled-components';

import { useUserConfigs } from '@stores/userConfigsStore';

import { ThemeProps } from '@interfaces/theme';

export default function SchedulingLayout() {
  const theme = useTheme() as ThemeProps;
  const { darkMode } = useUserConfigs();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.statusBar }}>
      <StatusBar
        translucent
        barStyle={darkMode ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.statusBar}
      />

      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>
        <Stack.Screen name="index" />
      </Stack>
    </View>
  );
}
