import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import {
  Container,
  Header,
  SliderContainer,
  DetailsContainer,
  HeaderDetailsContainer,
  BrandAndModelContainer,
  Brand,
  Model,
  PriceContainer,
  PriceDetails,
  Price,
  HighlightsContainer,
  HighlightCard,
  HighlightCardSpacer,
  HighlightValue,
} from './styles';

import { formatCurrency } from '@utils/formatCurrency';

import { isAxiosError } from 'axios';
import { useTheme } from 'styled-components';
import { router, useLocalSearchParams } from 'expo-router';

import { Screen } from '@components/Screen';
import { BackButton } from '@components/BackButton';
import { ImageSlider } from '@components/ImageSlider';
// import { VehicleHighlightItem } from '@components/VehicleHighlightItem';

import { JeepIcon } from 'phosphor-react-native/src/icons/Jeep';
import { UsersIcon } from 'phosphor-react-native/src/icons/Users';
import { GitForkIcon } from 'phosphor-react-native/src/icons/GitFork';

import api from '@api/api';

import { Vehicle } from '@interfaces/vehicle';
import { ThemeProps } from '@interfaces/theme';

const transmissionMap: Record<string, string> = {
  MANUAL: 'Manual',
  SEMI_AUTOMATIC: 'Semi-Auto',
  AUTOMATIC: 'Auto',
};

export function VehicleDetails() {
  const theme = useTheme() as ThemeProps;
  const { id } = useLocalSearchParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);

  const formattedPrice = formatCurrency(vehicle?.dailyRate ?? 0, 'pt-BR', 'BRL');

  console.log('vehicle data:', vehicle);

  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    const fetchVehicle = async () => {
      setLoading(true);
      try {
        const { data, status } = await api(`/vehicle/${id}`);
        if (!!data && status === 200) {
          setVehicle(data);
        }
      } catch (error) {
        if (isAxiosError(error)) {
          Alert.alert('Erro:', `Failed to fetch vehicle data: ${error.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchVehicle();
    }
  }, [id]);

  const highlights = vehicle
    ? [
        {
          id: 'transmission',
          title: 'Transmissão',
          value: transmissionMap[vehicle.transmission] || vehicle.transmission,
          icon: <GitForkIcon size={24} color={theme.colors.textGray} weight="regular" />,
        },
        {
          id: 'passengers',
          title: 'Capacidade',
          value: `${vehicle.passengerCapacity} pessoas`,
          icon: <UsersIcon size={24} color={theme.colors.textGray} weight="regular" />,
        },
        {
          id: 'traction',
          title: 'Tração',
          value: vehicle.has4x4 ? '4x4' : '4x2',
          icon: <JeepIcon size={24} color={theme.colors.textGray} weight="regular" />,
        },
      ]
    : [];

  if (loading) return;

  return (
    <Screen>
      <Container>
        <Header>
          <BackButton onPress={handleBack} />
        </Header>
        <SliderContainer>
          <ImageSlider data={vehicle?.images ?? []} />
        </SliderContainer>

        <DetailsContainer>
          <HeaderDetailsContainer>
            <BrandAndModelContainer>
              <Brand>{vehicle?.brand}</Brand>
              <Model>{vehicle?.model}</Model>
            </BrandAndModelContainer>

            <PriceContainer>
              <PriceDetails>Ao dia</PriceDetails>
              <Price>{formattedPrice}</Price>
            </PriceContainer>
          </HeaderDetailsContainer>

          <HighlightsContainer>
            {highlights.map((item) => (
              <HighlightCard key={item.id}>
                {item.icon}
                <HighlightCardSpacer />
                <HighlightValue>{item.value}</HighlightValue>
              </HighlightCard>
            ))}
          </HighlightsContainer>
        </DetailsContainer>
      </Container>
    </Screen>
  );
}
