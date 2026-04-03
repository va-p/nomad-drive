import React from 'react';
import { Platform } from 'react-native';
import { Container, LogoWrapper, Title, Text } from './styles';

import { useRouter } from 'expo-router';

import { Screen } from '@components/Screen';
import { Button } from '@components/Button';

import Logotipo from '@assets/Logotipo.svg';

export function Welcome() {
  const router = useRouter();

  function handlePressSignIn() {
    router.navigate('/signIn');
  }

  function handlePressSignUp() {
    router.navigate('/signUp');
  }

  return (
    <Screen>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <LogoWrapper>
          <Logotipo width={100} height={100} />
        </LogoWrapper>

        <Title>
          Explore Atins {'\n'}
          <Title primary>Como</Title> <Title primary>Nunca</Title>.
        </Title>

        <Button.Root onPress={handlePressSignIn} style={{ width: '50%', alignSelf: 'center' }}>
          <Button.Text text="Login" />
        </Button.Root>

        <Text onPress={handlePressSignUp}>Criar uma conta</Text>
      </Container>
    </Screen>
  );
}
