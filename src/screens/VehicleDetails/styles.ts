import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 0 16px;
  background-color: ${({ theme }) => theme.colors.backgroundNav};
`;

export const Header = styled.View`
  flex-direction: row;
  position: absolute;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  margin-left: 24px;
  z-index: 1000;
`;

export const SliderContainer = styled.View`
  margin-bottom: 16px;
`;

export const DetailsContainer = styled.View``;

export const HeaderDetailsContainer = styled.View`
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
  color: ${({ theme }) => theme.colors.textGray};
`;

export const Price = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: 18px;
  text-align: left;
  color: ${({ theme }) => theme.colors.primary};
`;

export const HighlightsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 16px;
  gap: 8px;
`;

export const HighlightCard = styled.View`
  width: 31%;
  padding: 16px 8px;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.shape};
`;

export const HighlightCardSpacer = styled.View`
  margin-top: 8px;
`;

export const HighlightValue = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textGray};
`;

export const Description = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 12px;
  text-align: left;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 16px;
`;
