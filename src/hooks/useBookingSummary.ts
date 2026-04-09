import { useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useBookingStore } from '@stores/useBookingStore';
import { calculateRentalPeriods } from '@utils/pricingRules';

export function useBookingSummary() {
  const { vehicle, startDate, endDate, pickupHour, dropoffHour } = useBookingStore(
    useShallow((state) => ({
      vehicle: state.vehicle,
      startDate: state.startDate,
      endDate: state.endDate,
      pickupHour: state.pickupHour,
      dropoffHour: state.dropoffHour,
    }))
  );

  const summary = useMemo(() => {
    const { displayDays, pricingMultiplier } = calculateRentalPeriods(
      startDate,
      endDate,
      pickupHour,
      dropoffHour
    );

    const baseDailyRate = vehicle?.dailyRate || 0;
    const totalPrice = baseDailyRate * pricingMultiplier;

    return {
      displayDays, // eg: 1.5
      totalPrice,
      isHalfDayIncluded: displayDays % 1 !== 0,
    };
  }, [startDate, endDate, pickupHour, dropoffHour, vehicle?.dailyRate]);

  return summary;
}
