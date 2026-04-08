import React from 'react';
import {
  Container,
  SliderContainer,
  DetailsContainer,
  DescriptionContainer,
  Description,
  Footer,
} from './styles';

// Hooks
import { useVehicleDetails } from '@hooks/useVehicleDetails';

// Dependencies
import { router, useLocalSearchParams } from 'expo-router';

// Components
import { Screen } from '@components/Screen';
import { Button } from '@components/Button';
import { ImageSlider } from '@components/ImageSlider';
import { VehicleHeader } from '@components/VehicleHeader';
import { VehicleSpecsGrid } from '@components/VehicleSpecsGrid';
import { Header } from '@components/Header';

export function VehicleDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: vehicle, isLoading } = useVehicleDetails(id);

  function handleClickRental() {
    router.navigate({
      pathname: '/scheduling',
      params: { vehicleId: id },
    });
  }

  if (isLoading || !vehicle) return null;

  return (
    <Screen>
      <Container>
        <Header.Root alignItems="flex-start">
          <Header.BackButton />
        </Header.Root>

        <SliderContainer>
          <ImageSlider data={vehicle?.images ?? []} />
        </SliderContainer>

        <DetailsContainer>
          <VehicleHeader
            brand={vehicle.brand}
            model={vehicle.model}
            dailyRate={vehicle.dailyRate}
          />

          <VehicleSpecsGrid vehicle={vehicle} />

          <DescriptionContainer>
            <Description>{vehicle?.description || ''}</Description>
          </DescriptionContainer>
        </DetailsContainer>

        <Footer>
          <Button.Root onPress={handleClickRental}>
            <Button.Text text="Escolher período do aluguel" />
          </Button.Root>
        </Footer>
      </Container>
    </Screen>
  );
}
