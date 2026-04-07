import React, { ReactNode } from 'react';
import { Container, VariantProps, TypeProps } from './styles';

import { RectButtonProps } from 'react-native-gesture-handler';

import { Load } from '@components/Button/components/Load';

type ButtonRootProps = RectButtonProps & {
  children: ReactNode;
  type?: TypeProps;
  variant?: VariantProps;
  isLoading?: boolean;
};

export function ButtonRoot({
  children,
  type = 'primary',
  variant = 'solid',
  isLoading,
  ...rest
}: ButtonRootProps) {
  return (
    <Container variant={variant} enabled={!isLoading} {...rest}>
      {isLoading ? <Load type={type} /> : children}
    </Container>
  );
}
