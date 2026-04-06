import { useQuery } from '@tanstack/react-query';
import { fetchVehicles } from '@services/vehicleService';

export function useVehicles() {
  return useQuery({
    queryKey: ['vehicles'],
    queryFn: fetchVehicles,
  });
}
