import React, { ReactNode } from 'react';
import { Container, Spacer, Value } from './styles';

type Props = {
  icon: ReactNode;
  value: string;
};

export function VehicleHighlightItem({ icon, value }: Props) {
  return (
    <Container>
      {icon}
      <Spacer />
      <Value>{value}</Value>
    </Container>
  );
}
