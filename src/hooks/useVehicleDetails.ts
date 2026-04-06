import { useQuery } from '@tanstack/react-query';
import { fetchVehicleById } from '@services/vehicleService';

export function useVehicleDetails(id: string | undefined) {
  return useQuery({
    queryKey: ['vehicle', id],
    queryFn: () => fetchVehicleById(id!),
    enabled: !!id,
  });
}
