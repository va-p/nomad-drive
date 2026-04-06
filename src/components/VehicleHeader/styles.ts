import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const BrandAndModelContainer = styled.View``;

export const Brand = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 12px;
  text-align: left;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textGray};
`;

export const Model = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: 18px;
  text-align: left;
  color: ${({ theme }) => theme.colors.title};
`;

export const PriceContainer = styled.View``;

export const PriceDetails = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 12px;
  text-align: left;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textGray};
`;

export const Price = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: 18px;
  text-align: left;
  color: ${({ theme }) => theme.colors.primary};
`;
