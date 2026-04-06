type VehicleType = 'QUADRICYCLE' | 'BUGGY' | 'UTV' | 'SUV';

type TransmissionType = 'MANUAL' | 'SEMI_AUTOMATIC' | 'AUTOMATIC';

type VehicleStatus = 'AVAILABLE' | 'RENTED' | 'MAINTENANCE' | 'UNAVAILABLE' | 'BLOCKED_BY_OWNER';

export interface Owner {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  document?: string | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

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
  description?: string | null;
  passengerCapacity: number;
  transmission: TransmissionType;
  has4x4: boolean;
  licensePlate: string;
  dailyRate: number;
  status: VehicleStatus;
  isActive: boolean;
  ownerId?: string | null;
  blockedDaysOfWeek?: number[] | null;
  owner?: Owner | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  images?: VehicleImage[];
}
