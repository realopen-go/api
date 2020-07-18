import { formatToTimeZone, parseFromTimeZone } from 'date-fns-timezone';

const TIME_ZONE = 'Asia/Seoul';

export const format = (date: Date, format = 'YYYY-MM-DD'): string => {
  return formatToTimeZone(date, format, {
    timeZone: TIME_ZONE,
  });
};

export const newDate = (date: string): Date => {
  return parseFromTimeZone(date, {
    timeZone: TIME_ZONE,
  });
};
