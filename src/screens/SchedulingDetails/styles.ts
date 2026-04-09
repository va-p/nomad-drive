import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 16px 16px 0;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const SliderContainer = styled.View`
  margin: 24px 0 16px;
`;

export const DescriptionContainer = styled.View`
  margin: 16px 0 40px;
`;

export const Description = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 14px;
  line-height: 25px;
  text-align: center;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.textGray};
`;

type RentalPeriodProps = {
  hasBorder?: boolean;
};

export const RentalPeriod = styled.View<RentalPeriodProps>`
  flex-direction: row;
  width: 100%;
  align-items: center;
  padding-bottom: 16px;

  ${({ hasBorder, theme }) =>
    hasBorder &&
    css`
      border-bottom-width: 1px;
      border-bottom-color: ${theme.colors.border};
      padding-bottom: 24px;
    `};
`;

export const IconContainer = styled.View`
  width: 48px;
  height: 48px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const DatesWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  margin-left: 24px;
`;

export const DateAndTimeInfo = styled.View`
  flex: 1;
`;

export const DateTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 12px;
  margin-bottom: 4px;
  color: ${({ theme }) => theme.colors.textGray};
`;

export const DateValue = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.title};
`;

export const RentalPrice = styled.View`
  width: 100%;
  margin-top: 16px;
`;

export const RentalPriceLabel = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 14px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textGray};
`;

export const RentalPriceDetails = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const RentalPriceGroup = styled.View``;

export const RentalPriceQuota = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.title};
`;

export const RentalPriceTotal = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 24px;
  color: ${({ theme }) => theme.colors.success};
`;
