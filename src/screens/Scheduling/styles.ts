import styled, { css } from 'styled-components/native';

interface DateValueProps {
  selected: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  height: 325px;
  justify-content: center;
  padding: 25px;
  padding-top: 36px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 25px;
  margin-top: 24px;
  color: ${({ theme }) => theme.colors.title};
`;

export const RentalPeriod = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin: 32px 0;
`;

export const DateInfo = styled.View`
  width: 30%;
`;

export const DateTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textGray};
`;

export const DateValue = styled.Text<DateValueProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textTitle};

  ${({ selected, theme }) =>
    !selected &&
    css`
      padding-bottom: 5px;
      border-bottom-width: 1px;
      border-bottom-color: ${theme.colors.border};
    `};
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 24,
  },
  showsVerticalScrollIndicator: false,
})``;

export const Footer = styled.View`
  padding: 24px;
`;

export const SelectedTimeSubTitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const SelectedTimeSubTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 12px;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.text};
`;
