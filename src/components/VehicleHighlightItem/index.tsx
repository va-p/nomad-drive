import React from 'react';
import { Container, Title } from './styles';

type Props = {
  title: string;
};

export function VehicleHighlightItem({ title }: Props) {
  return (
    <Container>
      {/*<Icon />*/}
      <Title>{title}</Title>
    </Container>
  );
}
