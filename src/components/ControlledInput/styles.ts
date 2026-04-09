import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
`;

export const ErrorMessage = styled.Text`
  font-size: ${({ theme }) => theme.fonts.sizeText}px;
  color: ${({ theme }) => theme.colors.attention};
`;
