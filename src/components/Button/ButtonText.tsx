import React from 'react';
import { Text, VariantProps } from './styles';

type ButtonTextPros = {
  text: string;
  variant?: VariantProps;
};

export function ButtonText({ text, variant }: ButtonTextPros) {
  return <Text variant={variant}>{text}</Text>;
}
