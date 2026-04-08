import { isToday } from 'date-fns';

export const RENTAL_RULES = {
  OPENING_HOUR: 7,
  CLOSING_HOUR: 19,
  MINIMUM_RENTAL_HOURS: 1,
};

export function getMinimumPickupHour(selectedDateString: string): {
  minHour: number;
  isTooLateForToday: boolean;
} {
  const selectedDate = new Date(`${selectedDateString}T12:00:00`);

  if (isToday(selectedDate)) {
    const currentHour = new Date().getHours();
    const nextHour = currentHour + 1;

    if (nextHour > RENTAL_RULES.CLOSING_HOUR) {
      return { minHour: RENTAL_RULES.OPENING_HOUR, isTooLateForToday: true };
    }

    return {
      minHour: Math.max(RENTAL_RULES.OPENING_HOUR, nextHour),
      isTooLateForToday: false,
    };
  }

  return { minHour: RENTAL_RULES.OPENING_HOUR, isTooLateForToday: false };
}

export function getDropoffLimits(isSameDay: boolean, selectedPickupHour: number) {
  if (isSameDay) {
    const minDropoff = selectedPickupHour + RENTAL_RULES.MINIMUM_RENTAL_HOURS;
    return {
      minDropoffHour: Math.min(minDropoff, RENTAL_RULES.CLOSING_HOUR),
    };
  }

  return {
    minDropoffHour: RENTAL_RULES.OPENING_HOUR,
  };
}
