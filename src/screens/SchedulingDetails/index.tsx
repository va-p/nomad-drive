import React from 'react';
import { Container, SliderContainer, DescriptionContainer, Description } from './styles';

import { useBookingStore } from '@stores/useBookingStore';

import { useShallow } from 'zustand/react/shallow';

import { Screen } from '@components/Screen';
import { Header } from '@components/Header';
import { ImageSlider } from '@components/ImageSlider';
import { VehicleSpecsGrid } from '@components/VehicleSpecsGrid';

export function SchedulingDetails() {
  const { vehicle, startDate, endDate, pickupHour, dropoffHour } = useBookingStore(
    useShallow((state) => ({
      vehicle: state.vehicle,
      startDate: state.startDate,
      endDate: state.endDate,
      pickupHour: state.pickupHour,
      dropoffHour: state.dropoffHour,
    }))
  );

  return (
    <Screen>
      <Container>
        <Header.Root alignItems="flex-start">
          <Header.BackButton />
        </Header.Root>

        <SliderContainer>
          <ImageSlider data={vehicle?.images ?? []} />
        </SliderContainer>

        <VehicleSpecsGrid vehicle={vehicle} />

        <DescriptionContainer>
          <Description>{vehicle?.description || ''}</Description>
        </DescriptionContainer>
      </Container>
    </Screen>
  );
}
