import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
  NoDateSelectedText,
  SelectedTimeSubTitleContainer,
  SelectedTimeSubTitle,
  TimePickerGroupContainer,
  TimePickerContainer,
} from './styles';

// Utils, stores
import { useBookingStore } from '@stores/useBookingStore';
import { RENTAL_RULES, getMinimumPickupHour, getDropoffLimits } from '@utils/rentalTimeRules';

// Dependencies
import { router } from 'expo-router';
import { addDays, format } from 'date-fns';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { TimerPicker } from 'react-native-timer-picker';

// Components
import { Modal } from '@components/Modal';
import { Button } from '@components/Button';
import { Screen } from '@components/Screen';
import { Header as HeaderComponent } from '@components/Header';
import { Calendar, DayProps, generateInterval, MarkedDateProps } from '@components/Calendar';

import ArrowSvg from '@assets/arrow.svg';

type RentalPeriodProps = {
  startFormatted: string;
  endFormatted: string;
};

export function Scheduling() {
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriodProps>({} as RentalPeriodProps);

  const setBookingPeriod = useBookingStore((state) => state.setBookingPeriod);

  const [warningMessage, setWarningMessage] = useState('');
  const [minPickupHour, setMinPickupHour] = useState(RENTAL_RULES.OPENING_HOUR);
  const [maxPickupHour, setMaxPickupHour] = useState(RENTAL_RULES.CLOSING_HOUR);

  const [selectedPickupHour, setSelectedPickupHour] = useState(RENTAL_RULES.OPENING_HOUR);
  const [selectedDropoffHour, setSelectedDropoffHour] = useState(RENTAL_RULES.OPENING_HOUR);

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const bottomSheetWarningRef = useRef<BottomSheetModal>(null);

  const isSameDayRental = useMemo(() => {
    if (!markedDates || Object.keys(markedDates).length === 0) return false;
    const dates = Object.keys(markedDates);
    return dates[0] === dates[dates.length - 1];
  }, [markedDates]);

  const { minDropoffHour } = useMemo(() => {
    return getDropoffLimits(isSameDayRental, selectedPickupHour);
  }, [isSameDayRental, selectedPickupHour]);

  useEffect(() => {
    if (selectedDropoffHour < minDropoffHour) {
      setSelectedDropoffHour(minDropoffHour);
    }
  }, [minDropoffHour, selectedDropoffHour]);

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      startFormatted: format(addDays(new Date(firstDate), 1), 'dd/MM/yyyy'),
      endFormatted: format(addDays(new Date(endDate), 1), 'dd/MM/yyyy'),
    });
  }

  function handleOpenModal() {
    if (Object.keys(markedDates).length === 0) {
      setWarningMessage('Você deve selecionar uma data para continuar!');
      bottomSheetWarningRef.current?.present();
      return;
    }

    const firstDateString = Object.keys(markedDates)[0];
    const { minHour, isTooLateForToday } = getMinimumPickupHour(firstDateString);

    const maxPickupHourAllowed = isSameDayRental
      ? RENTAL_RULES.CLOSING_HOUR - RENTAL_RULES.MINIMUM_RENTAL_HOURS
      : RENTAL_RULES.CLOSING_HOUR;

    if (isTooLateForToday || minHour > maxPickupHourAllowed) {
      setWarningMessage(
        'Infelizmente, o horário disponível de hoje não permite o tempo mínimo de locação. Selecione a partir de amanhã.'
      );
      bottomSheetWarningRef.current?.present();
      return;
    }

    setMinPickupHour(minHour);
    setMaxPickupHour(maxPickupHourAllowed);

    setSelectedPickupHour(minHour);

    const initialMinDropoff = getDropoffLimits(isSameDayRental, minHour).minDropoffHour;
    setSelectedDropoffHour(initialMinDropoff);

    bottomSheetRef.current?.present();
  }

  function handleConfirmBooking() {
    const dates = Object.keys(markedDates);
    const startDate = dates[0];
    const endDate = dates[dates.length - 1];

    setBookingPeriod({
      start: startDate,
      end: endDate,
      pickupHour: selectedPickupHour,
      dropoffHour: selectedDropoffHour,
    });

    bottomSheetRef.current?.dismiss();
    router.push('/schedulingDetails');
  }

  return (
    <Screen>
      <Container>
        <Header>
          <HeaderComponent.Root alignItems="flex-start">
            <HeaderComponent.BackButton />
          </HeaderComponent.Root>

          <Title>
            Escolha uma {'\n'}
            data de início e {'\n'}
            fim do aluguel
          </Title>

          <RentalPeriod>
            <DateInfo>
              <DateTitle>RETIRADA</DateTitle>
              <DateValue selected={!!rentalPeriod.startFormatted}>
                {rentalPeriod.startFormatted}
              </DateValue>
            </DateInfo>

            <ArrowSvg />

            <DateInfo>
              <DateTitle>DEVOLUÇÃO</DateTitle>
              <DateValue selected={!!rentalPeriod.endFormatted}>
                {rentalPeriod.endFormatted}
              </DateValue>
            </DateInfo>
          </RentalPeriod>
        </Header>

        <Content>
          <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
        </Content>

        <Footer>
          <Button.Root onPress={handleOpenModal}>
            <Button.Text text="Continuar" />
          </Button.Root>
        </Footer>

        <Modal bottomSheetRef={bottomSheetWarningRef} snapPoints={['30%']} title="Atenção">
          <NoDateSelectedText>{warningMessage}</NoDateSelectedText>
        </Modal>

        <Modal
          bottomSheetRef={bottomSheetRef}
          snapPoints={['40%']}
          title="Selecione o horário"
          enableContentPanningGesture={false}>
          <SelectedTimeSubTitleContainer>
            <SelectedTimeSubTitle>RETIRADA</SelectedTimeSubTitle>
            <SelectedTimeSubTitle>DEVOLUÇÃO</SelectedTimeSubTitle>
          </SelectedTimeSubTitleContainer>

          <TimePickerGroupContainer>
            <TimePickerContainer>
              <TimerPicker
                hideMinutes
                hideSeconds
                initialValue={{ hours: minPickupHour }}
                hourLimit={{
                  min: minPickupHour,
                  max: maxPickupHour,
                }}
                onDurationChange={(time) => {
                  setSelectedPickupHour(time.hours);
                }}
              />
            </TimePickerContainer>

            <TimePickerContainer>
              <TimerPicker
                key={`dropoff-${minDropoffHour}`}
                hideMinutes
                hideSeconds
                initialValue={{ hours: Math.max(selectedDropoffHour, minDropoffHour) }}
                hourLimit={{
                  min: minDropoffHour,
                  max: RENTAL_RULES.CLOSING_HOUR,
                }}
                onDurationChange={(time) => {
                  setSelectedDropoffHour(time.hours);
                }}
              />
            </TimePickerContainer>
          </TimePickerGroupContainer>

          <Button.Root onPress={handleConfirmBooking}>
            <Button.Text text="Continuar" />
          </Button.Root>
        </Modal>
      </Container>
    </Screen>
  );
}
