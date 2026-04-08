import React, { useRef, useState } from 'react';
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
  SelectedTimeSubTitleContainer,
  SelectedTimeSubTitle,
} from './styles';

import { router } from 'expo-router';
import { addDays, format } from 'date-fns';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { Modal } from '@components/Modal';
import { Button } from '@components/Button';
import { Screen } from '@components/Screen';
import { Calendar, DayProps, generateInterval, MarkedDateProps } from '@components/Calendar';

// import { CarDTO } from '../../database/model/Car';

import ArrowSvg from '@assets/arrow.svg';

type RentalPeriodProps = {
  startFormatted: string;
  endFormatted: string;
};

interface Params {
  car: CarDTO;
}

export function Scheduling() {
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriodProps>({} as RentalPeriodProps);

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const handleBack = () => {
    router.back();
  };

  const handleOpenModal = () => {
    // TODO: Check if end date is selected before opening modal
    if (lastSelectedDate.timestamp) {
      bottomSheetRef.current?.present();
    }
  };

  const handleCloseModal = () => {
    bottomSheetRef.current?.dismiss();
  };

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

  return (
    <Screen>
      <Container>
        <Header>
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

        <Modal bottomSheetRef={bottomSheetRef} snapPoints={['30%']} title="Selecione o horário">
          <SelectedTimeSubTitleContainer>
            <SelectedTimeSubTitle>Retirada</SelectedTimeSubTitle>
            <SelectedTimeSubTitle>Devolução</SelectedTimeSubTitle>
          </SelectedTimeSubTitleContainer>
        </Modal>
      </Container>
    </Screen>
  );
}
