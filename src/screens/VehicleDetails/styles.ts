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
  margin: 24px 0 16px;
`;

export const DetailsContainer = styled.View``;

export const DescriptionContainer = styled.View`
  margin-top: 16px;
`;

export const Description = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 14px;
  line-height: 25px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textGray};
  margin-bottom: 16px;
`;

export const Footer = styled.View`
  position: absolute;
  bottom: 24px;
  left: 0;
  right: 0;
  padding: 0 16px;
`;
