import { Stack } from 'expo-router';

export default function FavoritesStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'transparent' },
      }}>
      <Stack.Screen name="index" options={{ title: 'Favoritos' }} />
    </Stack>
  );
}
