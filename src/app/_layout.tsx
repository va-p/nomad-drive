import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';

import * as Font from 'expo-font';
import * as WebBrowser from 'expo-web-browser';
import * as SecureStore from 'expo-secure-store';
import { ClerkProvider } from '@clerk/clerk-expo';
import { ThemeProvider } from 'styled-components';
import * as SplashScreen from 'expo-splash-screen';
import { Slot, useRouter, useSegments } from 'expo-router';
import { LogLevel, OneSignal } from 'react-native-onesignal';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// import { SkeletonHomeScreen } from '@components/SkeletonOverviewScreen';

import { AuthProvider, useAuth } from '@contexts/AuthProvider';
import { Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';

import { useUserConfigs } from '@stores/userConfigsStore';
import { STORAGE_CONFIGS, storageConfig } from '@storage/mmkv';

import darkTheme from '@themes/darkTheme';
import lightTheme from '@themes/lightTheme';

SplashScreen.preventAutoHideAsync();

const PUBLIC_CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

WebBrowser.maybeCompleteAuthSession();

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

function RootNavigationLayout() {
  const { isSignedIn, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  const skipWelcomeScreen = storageConfig.getBoolean(`${STORAGE_CONFIGS}.skipWelcomeScreen`);

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!isSignedIn && !inAuthGroup) {
      const destination = skipWelcomeScreen ? '/(auth)/signIn' : '/(auth)';
      router.replace(destination);
    }

    if (isSignedIn && inAuthGroup) {
      router.replace('/(app)');
    }
  }, [isSignedIn, loading, segments, router, skipWelcomeScreen]);

  if (loading) {
    // return <SkeletonHomeScreen />;
    return null;
  }

  return <Slot />;
}

export default function RootLayout() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 1000 * 60 * 5, retry: 2 } },
  });

  const setDarkMode = useUserConfigs((state) => state.setDarkMode);
  const deviceColorScheme = useColorScheme();

  const darkModeUserConfig: boolean | undefined = storageConfig.getBoolean(
    `${STORAGE_CONFIGS}.darkMode`
  );

  let useDarkMode: boolean;

  if (darkModeUserConfig !== undefined) {
    useDarkMode = darkModeUserConfig;
  } else {
    useDarkMode = deviceColorScheme === 'dark';
  }

  const theme = useDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    setDarkMode(useDarkMode);
  }, [useDarkMode, setDarkMode]);

  const [fontsLoaded, fontError] = Font.useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }

    // Inicializa o OneSignal uma única vez
    OneSignal.Debug.setLogLevel(LogLevel.Verbose); // Debug
    OneSignal.initialize('9b887fe6-28dc-495a-939b-ae527403a302');
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <ClerkProvider tokenCache={tokenCache} publishableKey={PUBLIC_CLERK_PUBLISHABLE_KEY || ''}>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <RootNavigationLayout />
            </AuthProvider>
          </QueryClientProvider>
        </ClerkProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
