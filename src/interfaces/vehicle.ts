type VehicleType = 'QUADRICYCLE' | 'BUGGY' | 'UTV' | 'SUV';

type TransmissionType = 'MANUAL' | 'SEMI_AUTOMATIC' | 'AUTOMATIC';

type VehicleStatus = 'AVAILABLE' | 'RENTED' | 'MAINTENANCE' | 'UNAVAILABLE';

export interface VehicleImage {
  id: string;
  vehicleId: string;
  imageUrl: string;
  isPrimary: boolean;
  displayOrder: number;
  caption?: string | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface Vehicle {
  id: string;
  type: VehicleType;
  brand: string;
  model: string;
  year: number;
  color: string;
  passengerCapacity: number;
  transmission: TransmissionType;
  licensePlate: string;
  dailyRate: number;
  status: VehicleStatus;
  isActive: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  images?: VehicleImage[];
}
