import React from 'react';
import { formatCurrency } from '@utils/formatCurrency';
import {
  Container,
  BrandAndModelContainer,
  Brand,
  Model,
  PriceContainer,
  PriceDetails,
  Price,
} from './styles';

interface Props {
  brand: string;
  model: string;
  dailyRate: number;
}

export function VehicleHeader({ brand, model, dailyRate }: Props) {
  const formattedPrice = formatCurrency(dailyRate, 'pt-BR', 'BRL');

  return (
    <Container>
      <BrandAndModelContainer>
        <Brand>{brand}</Brand>
        <Model>{model}</Model>
      </BrandAndModelContainer>

      <PriceContainer>
        <PriceDetails>Ao dia</PriceDetails>
        <Price>{formattedPrice}</Price>
      </PriceContainer>
    </Container>
  );
}
