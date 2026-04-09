import styled, { css } from 'styled-components/native';

import { BorderlessButton } from 'react-native-gesture-handler';

type ContainerProps = {
  childsCount: number;
};

export const Container = styled.View<ContainerProps>`
  width: 100%;
  flex-direction: row;
  column-gap: 16px;

  ${({ childsCount }) =>
    childsCount === 1 &&
    css`
      justify-content: center;
    `};

  ${({ childsCount }) =>
    childsCount === 2 &&
    css`
      justify-content: flex-start;
    `};

  ${({ childsCount }) =>
    childsCount >= 3 &&
    css`
      justify-content: space-between;
    `};

  ${({ alignItems }) =>
    alignItems === 'flex-start' &&
    css`
      justify-content: flex-start;
    `};

  ${({ alignItems }) =>
    alignItems === 'flex-end' &&
    css`
      justify-content: flex-end;
    `};

  ${({ alignItems }) =>
    alignItems === 'center' &&
    css`
      justify-content: center;
    `};
`;

export const Button = styled(BorderlessButton)``;

export const ButtonShape = styled.View`
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.shape};
`;

export const TitleContainer = styled.View`
  max-width: 84%;
`;

export const Title = styled.Text.attrs({
  numberOfLines: 2,
  ellipsizeMode: 'tail',
})`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: 16px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
`;

export const Description = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.fonts.sizeText}px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
`;

export const EditButton = styled(BorderlessButton)``;
