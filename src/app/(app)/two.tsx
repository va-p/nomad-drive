import { Stack } from 'expo-router';

import { StyleSheet, View, Text } from 'react-native';

import { Screen } from '@components/Screen';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tab Two' }} />
      <View style={styles.container}>
        <Screen>
          <Text>Nomad Drive - Sua corrida na hora certa!</Text>
        </Screen>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
