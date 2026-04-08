import React, { useRef, useState } from 'react';
import { FlatList, ViewToken, Dimensions } from 'react-native';
import { VehicleImageWrapper, VehicleImage, Container, ImageIndexes } from './styles';

import { Bullet } from '@components/Bullet';

import { VehicleImage as VehicleImageInterface } from '@interfaces/vehicle';

interface Props {
  data: VehicleImageInterface[];
}

interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

const SCREEN_WIDTH = Dimensions.get('window').width;

export function ImageSlider({ data }: Props) {
  const [imageIndex, setImageIndex] = useState(0);

  const indexChanged = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index!;
    setImageIndex(index);
  });

  return (
    <Container>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <VehicleImageWrapper>
            <VehicleImage
              source={{
                uri: item.imageUrl,
              }}
              contentFit="contain"
            />
          </VehicleImageWrapper>
        )}
        horizontal
        snapToOffsets={[...Array(data.length)].map(
          (_, i) => i * (SCREEN_WIDTH * 0.8 - 32) + (i - 1) * 32
        )}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={indexChanged.current}
      />
      <ImageIndexes>
        {data.map((item, index) => (
          <Bullet key={String(item.id)} active={index === imageIndex} />
        ))}
      </ImageIndexes>
    </Container>
  );
}
