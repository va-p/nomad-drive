import React from 'react';
import {
  Container,
  SliderContainer,
  DescriptionContainer,
  Description,
  RentalPeriod,
  IconContainer,
  DatesWrapper,
  DateAndTimeInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceGroup,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
} from './styles';

import { useBookingStore } from '@stores/useBookingStore';
import { useBookingSummary } from '@hooks/useBookingSummary';

import { format } from 'date-fns';
import { useTheme } from 'styled-components';
import { useShallow } from 'zustand/react/shallow';

import { Screen } from '@components/Screen';
import { Header } from '@components/Header';
import { ImageSlider } from '@components/ImageSlider';
import { VehicleSpecsGrid } from '@components/VehicleSpecsGrid';

import { ClockIcon } from 'phosphor-react-native/src/icons/Clock';
import { CalendarCheckIcon } from 'phosphor-react-native/src/icons/CalendarCheck';

import { Vehicle } from '@interfaces/vehicle';
import { ThemeProps } from '@interfaces/theme';

export function SchedulingDetails() {
  const theme = useTheme() as ThemeProps;
  const { vehicle, startDate, endDate, pickupHour, dropoffHour } = useBookingStore(
    useShallow((state) => ({
      vehicle: state.vehicle,
      startDate: state.startDate,
      endDate: state.endDate,
      pickupHour: state.pickupHour,
      dropoffHour: state.dropoffHour,
    }))
  );

  const { displayDays, totalPrice, isHalfDayIncluded } = useBookingSummary();

  const formattedDisplayDays = displayDays.toString().replace('.', ',');
  const formatedStartDate = format(new Date(startDate), 'dd/MM/yyyy');
  const formatedEndDate = format(new Date(endDate), 'dd/MM/yyyy');

  return (
    <Screen>
      <Container>
        <Header.Root alignItems="flex-start">
          <Header.BackButton />
        </Header.Root>

        <SliderContainer>
          <ImageSlider data={vehicle?.images ?? []} />
        </SliderContainer>

        <VehicleSpecsGrid vehicle={vehicle ?? ({} as Vehicle)} />

        <DescriptionContainer>
          <Description>{vehicle?.description || ''}</Description>
        </DescriptionContainer>

        <RentalPeriod>
          <IconContainer>
            <CalendarCheckIcon color={theme.colors.text} size={24} />
          </IconContainer>

          <DatesWrapper>
            <DateAndTimeInfo>
              <DateTitle>RETIRADA</DateTitle>
              <DateValue>{formatedStartDate}</DateValue>
            </DateAndTimeInfo>

            <DateAndTimeInfo>
              <DateTitle>DEVOLUÇÃO</DateTitle>
              <DateValue>{formatedEndDate}</DateValue>
            </DateAndTimeInfo>
          </DatesWrapper>
        </RentalPeriod>

        <RentalPeriod hasBorder>
          <IconContainer>
            <ClockIcon color={theme.colors.text} size={24} />
          </IconContainer>

          <DatesWrapper>
            <DateAndTimeInfo>
              <DateTitle>HORÁRIO RETIRADA</DateTitle>
              <DateValue>{pickupHour}H</DateValue>
            </DateAndTimeInfo>

            <DateAndTimeInfo>
              <DateTitle>HORÁRIO DEVOLUÇÃO</DateTitle>
              <DateValue>{dropoffHour}H</DateValue>
            </DateAndTimeInfo>
          </DatesWrapper>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>

          <RentalPriceDetails>
            <RentalPriceGroup>
              <RentalPriceQuota>{`R$ ${vehicle?.dailyRate} x ${formattedDisplayDays} diárias`}</RentalPriceQuota>

              {isHalfDayIncluded && <RentalPriceQuota>*Incluído meia-diária</RentalPriceQuota>}
            </RentalPriceGroup>

            <RentalPriceTotal>R$ {totalPrice.toFixed(2).replace('.', ',')}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Container>
    </Screen>
  );
}
