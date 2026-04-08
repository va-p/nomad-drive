import { addDays, eachDayOfInterval, format } from 'date-fns';

import { MarkedDateProps, DayProps } from '.';

import theme from '../../global/themes/darkTheme';

export function generateInterval(start: DayProps, end: DayProps) {
  let interval: MarkedDateProps = {};

  eachDayOfInterval({ start: new Date(start.timestamp), end: new Date(end.timestamp) }).forEach(
    (item) => {
      const date = format(addDays(item, 1), 'yyyy-MM-dd');

      interval = {
        ...interval,
        [date]: {
          color:
            start.dateString === date || end.dateString === date
              ? theme.colors.primary
              : theme.colors.primary_light,

          textColor:
            start.dateString === date || end.dateString === date
              ? theme.colors.textLight
              : theme.colors.textLight,
        },
      };
    }
  );

  return interval;
}
