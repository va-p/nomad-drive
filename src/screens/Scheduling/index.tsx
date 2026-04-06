import React from 'react';
import { Container, SliderContainer } from './styles';

// Hooks
import { useVehicleDetails } from '@hooks/useVehicleDetails';

// Dependencies
import { router, useLocalSearchParams } from 'expo-router';

// Components
import { Screen } from '@components/Screen';
import { Header } from '@components/Header';
import { BackButton } from '@components/BackButton';
import { ImageSlider } from '@components/ImageSlider';
import { VehicleHeader } from '@components/VehicleHeader';
import { VehicleSpecsGrid } from '@components/VehicleSpecsGrid';

export function Scheduling() {
  const { vehicleId } = useLocalSearchParams<{ vehicleId: string }>();
  const { data: vehicle, isLoading } = useVehicleDetails(vehicleId);

  const handleBack = () => {
    router.back();
  };

  if (isLoading || !vehicle) return null;

  return (
    <Screen>
      <Container>
        <Header.Root>
          <BackButton onPress={handleBack} />
        </Header.Root>

        <SliderContainer>
          <ImageSlider data={vehicle?.images ?? []} />
        </SliderContainer>

        <VehicleHeader brand={vehicle.brand} model={vehicle.model} dailyRate={vehicle.dailyRate} />

        <VehicleSpecsGrid vehicle={vehicle} />
      </Container>
    </Screen>
  );
}
