import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  flex-direction: row;
  width: 100%;
  min-height: 60px;
  max-height: 120px;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  margin-bottom: 8px;
  background-color: ${({ theme }) => theme.colors.shape};
`;

export const DetailsContainer = styled.View`
  max-width: 50%;
`;

export const Type = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textGray};
`;

export const Brand = styled.Text.attrs({
  numberOfLines: 1,
  textTransform: 'capitalize',
})`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textGray};
`;

export const Model = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.title};
`;

export const PassengerCapacity = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textGray};
`;

export const PriceContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 16px;
`;

export const DailyRate = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

export const PriceDescription = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textGray};
`;

export const ImageContainer = styled.View`
  max-width: 50%;
`;

export const Image = styled.Image.attrs({
  resizeMode: 'cover',
})`
  min-width: 150px;
  max-width: 150px;
  min-height: 100px;
  max-height: 100px;
`;
