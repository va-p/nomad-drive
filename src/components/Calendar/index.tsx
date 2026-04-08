import React from 'react';
import { useTheme } from 'styled-components';
import {
  Calendar as CustomCalendar,
  LocaleConfig,
  DateCallbackHandler,
} from 'react-native-calendars';

import { ptBR } from './localeConfig';
import { generateInterval } from './generateInterval';

import { ArrowLeftIcon } from 'phosphor-react-native/src/icons/ArrowLeft';
import { ArrowRightIcon } from 'phosphor-react-native/src/icons/ArrowRight';

import { ThemeProps } from '@interfaces/theme';

LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';

interface MarkedDateProps {
  [date: string]: {
    color: string;
    textColor: string;
    disabled?: boolean;
    disableTouchEvent?: boolean;
  };
}

interface DayProps {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}

interface CalendarProps {
  markedDates: MarkedDateProps;
  onDayPress: DateCallbackHandler;
}

function Calendar({ markedDates, onDayPress }: CalendarProps) {
  const theme = useTheme() as ThemeProps;

  return (
    <CustomCalendar
      renderArrow={(direction) =>
        direction === 'left' ? (
          <ArrowLeftIcon color={theme.colors.text} size={24} />
        ) : (
          <ArrowRightIcon color={theme.colors.text} size={24} />
        )
      }
      headerStyle={{
        backgroundColor: theme.colors.background,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.border,
        paddingBottom: 10,
        marginBottom: 10,
      }}
      theme={{
        textDayFontFamily: theme.fonts.regular,
        textDayHeaderFontFamily: theme.fonts.medium,
        textDayHeaderFontSize: 10,
        textMonthFontFamily: theme.fonts.regular,
        textMonthFontSize: 20,
        monthTextColor: theme.colors.title,
        arrowStyle: {
          marginHorizontal: -15,
        },
      }}
      firstDay={1}
      minDate={String(new Date())}
      markingType="period"
      markedDates={markedDates}
      onDayPress={onDayPress}
    />
  );
}

export { Calendar, MarkedDateProps, DayProps, generateInterval };
