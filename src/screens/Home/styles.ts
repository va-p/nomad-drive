import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  min-height: 110px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.backgroundCardHeader};
`;

export const Description = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textGray};
`;

export const ListContainer = styled.View``;
