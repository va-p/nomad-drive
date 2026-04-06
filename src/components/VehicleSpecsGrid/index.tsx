import React from 'react';
import { Container } from './styles';

import { useTheme } from 'styled-components';

import { VehicleHighlightItem } from '@components/VehicleHighlightItem';

// Icons
import { JeepIcon } from 'phosphor-react-native/src/icons/Jeep';
import { UsersIcon } from 'phosphor-react-native/src/icons/Users';
import { GitForkIcon } from 'phosphor-react-native/src/icons/GitFork';

// Interfaces
import { Vehicle } from '@interfaces/vehicle';
import { ThemeProps } from '@interfaces/theme';

const transmissionMap: Record<string, string> = {
  MANUAL: 'Manual',
  SEMI_AUTOMATIC: 'Semi-Auto',
  AUTOMATIC: 'Automático',
};

interface Props {
  vehicle: Vehicle;
}

export function VehicleSpecsGrid({ vehicle }: Props) {
  const theme = useTheme() as ThemeProps;

  const highlights = [
    {
      id: 'transmission',
      value: transmissionMap[vehicle.transmission] || vehicle.transmission,
      icon: <GitForkIcon size={24} color={theme.colors.textGray} weight="regular" />,
    },
    {
      id: 'passengers',
      value: `${vehicle.passengerCapacity} pessoas`,
      icon: <UsersIcon size={24} color={theme.colors.textGray} weight="regular" />,
    },
    {
      id: 'traction',
      value: vehicle.has4x4 ? '4x4' : '4x2',
      icon: <JeepIcon size={24} color={theme.colors.textGray} weight="regular" />,
    },
  ];

  return (
    <Container>
      {highlights.map((item) => (
        <VehicleHighlightItem key={item.id} icon={item.icon} value={item.value} />
      ))}
    </Container>
  );
}
