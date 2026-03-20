import { Stack } from 'expo-router';

export default function TripsStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'transparent' },
      }}>
      <Stack.Screen name="index" options={{ title: 'Viagens' }} />
    </Stack>
  );
}
