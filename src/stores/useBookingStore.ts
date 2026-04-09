import { create } from 'zustand';

import { Vehicle } from '@interfaces/vehicle';

interface BookingState {
  vehicle: Vehicle | null;
  startDate: string; // Format YYYY-MM-DD
  endDate: string; // Format YYYY-MM-DD
  pickupHour: number;
  dropoffHour: number;

  // Actions
  setVehicle: (vehicle: Vehicle | null) => void;
  setBookingPeriod: (data: {
    start: string;
    end: string;
    pickupHour: number;
    dropoffHour: number;
  }) => void;
  clearBooking: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  vehicle: null,
  startDate: '',
  endDate: '',
  pickupHour: 0,
  dropoffHour: 0,

  setVehicle: (vehicle) => set({ vehicle }),

  setBookingPeriod: (data) =>
    set({
      startDate: data.start,
      endDate: data.end,
      pickupHour: data.pickupHour,
      dropoffHour: data.dropoffHour,
    }),

  clearBooking: () =>
    set({
      vehicle: null,
      startDate: '',
      endDate: '',
      pickupHour: 0,
      dropoffHour: 0,
    }),
}));
