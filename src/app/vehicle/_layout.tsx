import { Stack } from 'expo-router';

export default function VehicleLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      {/* Mapeia explicitamente o arquivo dinâmico */}
      <Stack.Screen name="[id]" />
    </Stack>
  );
}
