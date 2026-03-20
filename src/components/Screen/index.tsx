import React, { ReactNode } from 'react';
import { Container } from './styles';

import { SafeAreaViewProps } from 'react-native-safe-area-context';

type ScreenProps = SafeAreaViewProps & {
  children: ReactNode;
};

export function Screen({ children, ...rest }: ScreenProps) {
  return <Container {...rest}>{children}</Container>;
}
