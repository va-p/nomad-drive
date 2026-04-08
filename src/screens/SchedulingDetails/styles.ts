import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 16px 16px 0;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const SliderContainer = styled.View`
  margin: 24px 0 16px;
`;

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
