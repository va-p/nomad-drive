import React from 'react';
import { Platform } from 'react-native';
import { Container } from './styles';

import { Screen } from '@components/Screen';
import { Header } from '@components/Header';
import { Button } from '@components/Button';

export function Profile() {
  function handlePressUpdate() {}

  return (
    <Screen>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Header.Root>
          <Header.BackButton />
          <Header.Title title={'Perfil'} />
        </Header.Root>

        <Button.Root onPress={handlePressUpdate} style={{ width: '50%', alignSelf: 'center' }}>
          <Button.Text text="Salvar" />
        </Button.Root>
      </Container>
    </Screen>
  );
}
