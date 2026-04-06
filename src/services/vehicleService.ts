import api from '@api/api';

import { Vehicle } from '@interfaces/vehicle';

export async function fetchVehicles(): Promise<Vehicle[]> {
  const { data } = await api.get<Vehicle[]>('/vehicle');
  return data;
}

export async function fetchVehicleById(id: string): Promise<Vehicle> {
  const { data } = await api.get<Vehicle>(`/vehicle/${id}`);
  return data;
}
