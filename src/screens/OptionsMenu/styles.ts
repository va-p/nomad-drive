import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const ContentScroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 56,
  },
  showsVerticalScrollIndicator: false,
})``;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 18px;
  padding-top: 16px;
  padding-left: 16px;
  color: ${({ theme }) => theme.colors.title};
`;

export const Footer = styled.View`
  margin-top: 24px;
`;

export const LogoutText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 16px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
`;

export const LogoutButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 16px;
  column-gap: 64px;
  /*justify-content: space-between;*/
`;
