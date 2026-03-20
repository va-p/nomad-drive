import React from 'react';
import {
  Container,
  DetailsContainer,
  Type,
  Brand,
  Model,
  PassengerCapacity,
  PriceContainer,
  DailyRate,
  PriceDescription,
  ImageContainer,
  Image,
} from './styles';
import { Vehicle } from '@interfaces/vehicle';
import { RectButtonProps } from 'react-native-gesture-handler';

type Props = RectButtonProps & {
  data: Vehicle;
};

export function VehicleListItem({ data, ...rest }: Props) {
  const primaryImageUrl =
    data.images?.find((img) => img.isPrimary)?.imageUrl || data.images?.[0].imageUrl || '';

  console.log('primaryImageUrl ===>', primaryImageUrl);

  return (
    <Container {...rest}>
      <DetailsContainer>
        <Type>{data.type}</Type>
        <Brand>{data.brand}</Brand>
        <Model>{data.model}</Model>
        <PassengerCapacity>{data.passengerCapacity} passageiros</PassengerCapacity>

        <PriceContainer>
          <DailyRate>R$ {data.dailyRate} </DailyRate>
          <PriceDescription>Diária</PriceDescription>
        </PriceContainer>
      </DetailsContainer>
      <ImageContainer>
        <Image source={{ uri: primaryImageUrl }} />
      </ImageContainer>
    </Container>
  );
}
