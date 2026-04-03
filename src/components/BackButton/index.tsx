import React from 'react';
import { Container } from './styles';

import { useTheme } from 'styled-components';

import { CaretLeftIcon } from 'phosphor-react-native/src/icons/CaretLeft';

import { ThemeProps } from '@interfaces/theme';

interface Props {
  color?: string;
  onPress: () => void;
}

export function BackButton({ color, onPress, ...rest }: Props) {
  const theme = useTheme() as ThemeProps;

  return (
    <Container onPress={onPress} {...rest}>
      <CaretLeftIcon size={24} color={color ? color : theme.colors.text} />
    </Container>
  );
}
