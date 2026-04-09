import { differenceInHours, parseISO, setHours } from 'date-fns';

export const PRICING_RULES = {
  // Limit of hours to be considered "Half Daily"
  HALF_DAY_MAX_HOURS: 5,

  // Billing Rules (Financial)
  HALF_DAY_MULTIPLIER: 0.65,
  FULL_DAY_MULTIPLIER: 1.0,

  // Display Rules (UI)
  HALF_DAY_DISPLAY: 0.5,
};

/**
 * Calculates rental factors.
 * Returns the display value (e.g: 1.5) and price multiplier (e.g: 1.65)
 */
export function calculateRentalPeriods(
  startDate: string,
  endDate: string,
  pickupHour: number,
  dropoffHour: number
): { displayDays: number; pricingMultiplier: number } {
  if (!startDate || !endDate) return { displayDays: 0, pricingMultiplier: 0 };

  const start = setHours(parseISO(`${startDate}T12:00:00`), pickupHour);
  const end = setHours(parseISO(`${endDate}T12:00:00`), dropoffHour);

  const totalHours = differenceInHours(end, start);

  if (totalHours <= 0) return { displayDays: 0, pricingMultiplier: 0 };

  const fullDays = Math.floor(totalHours / 24);
  const remainingHours = totalHours % 24;

  let partialDayMultiplier = 0;
  let partialDayDisplay = 0;

  if (remainingHours > 0) {
    if (remainingHours <= PRICING_RULES.HALF_DAY_MAX_HOURS) {
      partialDayMultiplier = PRICING_RULES.HALF_DAY_MULTIPLIER;
      partialDayDisplay = PRICING_RULES.HALF_DAY_DISPLAY;
    } else {
      partialDayMultiplier = PRICING_RULES.FULL_DAY_MULTIPLIER;
      partialDayDisplay = PRICING_RULES.FULL_DAY_MULTIPLIER;
    }
  }

  return {
    displayDays: fullDays + partialDayDisplay, // E.g: 1.5
    pricingMultiplier: fullDays + partialDayMultiplier, // E.g: 1.65
  };
}
