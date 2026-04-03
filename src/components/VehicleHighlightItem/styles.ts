import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 16px;
  row-gap: 8px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: 14px;
`;
