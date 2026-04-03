import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { Image } from 'expo-image';

const WINDOW_WIDTH = Dimensions.get('window').width;

export const Container = styled.View`
  width: 100%;
  justify-content: center;
`;

export const ImageIndexes = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const VehicleImageWrapper = styled.View`
  width: ${WINDOW_WIDTH}px;
  height: 200px;
  align-items: center;
  justify-content: center;
`;

export const VehicleImage = styled(Image).attrs({
  style: {
    flex: 1,
  },
})`
  width: 100%;
  min-height: 180px;
`;
