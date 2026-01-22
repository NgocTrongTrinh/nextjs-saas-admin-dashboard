import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import updateLocale from 'dayjs/plugin/updateLocale';
import relativeTime from 'dayjs/plugin/relativeTime';
import isBetween from 'dayjs/plugin/isBetween';
import utc from 'dayjs/plugin/utc';

dayjs.extend(localeData);
dayjs.extend(weekday);
dayjs.extend(updateLocale);
dayjs.extend(relativeTime);
dayjs.extend(isBetween);
dayjs.extend(utc);

export const isProduction = () => {
  return process.env.NODE_ENV == 'production';
};

export const isNotProduction = () => {
  return process.env.NODE_ENV !== 'production';
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type DateTimeFormat =
  | 'YYYY/MM/DD'
  | 'YYYY/MM/DD HH'
  | 'YYYY/MM/DD HH:mm'
  | 'YYYY/MM/DD(ddd) HH:mm'
  | 'YYYY/MM/DD(ddd)'
  | 'HH:mm'
  | 'MM/DD'
  | 'YYYYMMDD'
  | 'MM/DD HH:mm';

export const toLocalTime = (
  value?: string | Date,
  format: DateTimeFormat = 'YYYY/MM/DD',
) => {
  if (!value) return '';
  return dayjs.utc(value).local().format(format);
};

export const isObjectEmpty = (obj: object) => {
  return Object.keys(obj).length === 0;
};

export const formatPhoneNumber = (phone: string): string => {
  if (!phone) return '';
  const digits = phone.replace(/\D/g, '');

  if (digits.length === 10) {
    return digits.replace(/(\d{3})(\d{4})(\d{3})/, '$1-$2-$3');
  }

  if (digits.length === 11) {
    return digits.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  }

  return phone;
};

export const normalizeEmptyHtml = (value?: string) => {
  if (!value) return '';
  const trimmed = value.trim();
  return /^<p>\s*<br\s*\/?>\s*<\/p>$/.test(trimmed) ? '' : value;
};
