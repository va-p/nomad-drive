import styled from 'styled-components/native';

export const Container = styled.View`
  width: 31%;
  padding: 16px 8px;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.shape};
`;

export const Spacer = styled.View`
  margin-top: 8px;
`;

export const Value = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${({ theme }) => theme.fonts.sizeText}px;
  color: ${({ theme }) => theme.colors.textGray};
`;
