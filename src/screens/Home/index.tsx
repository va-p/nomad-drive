import React from 'react';
import { FlatList } from 'react-native';
import { Container, Header, Description, ListContainer } from './styles';

// Hooks
import { useVehicles } from '@hooks/useVehicles';

import { router } from 'expo-router';

// Components
import { Screen } from '@components/Screen';
import { VehicleListItem } from '@components/VehicleListItem';

import Logo from '@assets/Logotipo.svg';

import { Vehicle } from '@interfaces/vehicle';

export function Home() {
  const { data: vehicles = [], isLoading, refetch } = useVehicles();

  const handleVehiclePress = (vehicleId: string) => {
    router.push(`/vehicle/${vehicleId}`);
  };

  return (
    <Screen>
      <Container>
        <Header>
          <Logo width={100} height={100} />
          <Description>Escolha Seu Modelo</Description>
        </Header>

        <ListContainer>
          <FlatList
            data={vehicles}
            keyExtractor={(item: Vehicle) => item.id.toString()}
            renderItem={({ item }) => (
              <VehicleListItem data={item} onPress={() => handleVehiclePress(item.id)} />
            )}
            onRefresh={refetch}
            refreshing={isLoading}
            contentContainerStyle={{
              padding: 16,
              paddingBottom: 200,
            }}
          />
        </ListContainer>
      </Container>
    </Screen>
  );
}
