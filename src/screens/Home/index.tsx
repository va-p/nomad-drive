import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Container, Header, Description, ListContainer } from './styles';

import { useUser } from '@stores/userStore';

import { useUser as useClerkUser } from '@clerk/clerk-expo';

import { Screen } from '@components/Screen';
import { VehicleListItem } from '@components/VehicleListItem';

import Logo from '@assets/Logotipo.svg';

import api from '@api/api';

import { Vehicle } from '@interfaces/vehicle';

export function Home() {
  const { user: clerkUser, isSignedIn: clerkSignedIn } = useClerkUser();
  const userId = useUser((state) => state.id);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  console.log('vehicles ===>', vehicles);

  const fetchVehicles = async () => {
    try {
      const { status, data } = await api('/vehicle');

      if (status === 200 && data) {
        setVehicles(data);
      }
    } catch (error) {
      console.error('fetchVehicles error:', error);
    }
  };

  const handleRefresh = async () => {
    await fetchVehicles();
  };

  useEffect(() => {
    if ((!!clerkUser && !!clerkSignedIn) || userId) {
      fetchVehicles();
    }
  }, [clerkUser, clerkSignedIn, userId]);

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
            renderItem={({ item }) => <VehicleListItem data={item} />}
            onRefresh={handleRefresh}
            refreshing={false}
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
