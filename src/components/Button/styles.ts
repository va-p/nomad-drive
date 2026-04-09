import styled from 'styled-components/native';

import { RectButton } from 'react-native-gesture-handler';

export type VariantProps = 'solid' | 'outline';

export type TypeProps = 'primary' | 'secondary';

export const Container = styled(RectButton)<VariantProps>`
  min-height: 40px;
  max-height: 40px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 8px;
  background-color: ${({ theme, variant }) =>
    variant === 'outline' ? 'transparent' : theme.colors.button};
  border-radius: 20px;
  border: ${({ theme, variant }) =>
    variant === 'outline' ? `1px solid ${theme.colors.button}` : 'none'};
`;

export const Text = styled.Text<VariantProps>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${({ theme }) => theme.fonts.sizeText}px;
  margin: 0 8px;
  color: ${({ theme, variant }) =>
    variant === 'outline' ? theme.colors.primary : theme.colors.textLight};
`;
