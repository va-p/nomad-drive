import { create } from 'zustand';

interface BookingState {
  vehicle: any | null;
  startDate: string; // Format YYYY-MM-DD
  endDate: string; // Format YYYY-MM-DD
  pickupHour: number;
  dropoffHour: number;

  // Actions
  setVehicle: (vehicle: any) => void;
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
