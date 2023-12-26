import { Day, Month } from "../models/date-picker.model";

export const MONTH_NAMES: Month[] = [
  new Month({num: 1, name: 'Jan'}),
  new Month({num: 2, name: 'Fev'}),
  new Month({num: 3, name: 'Mar'}),
  new Month({num: 4, name: 'Abr'}),
  new Month({num: 5, name: 'Mai'}),
  new Month({num: 6, name: 'Jun'}),
  new Month({num: 7, name: 'Jul'}),
  new Month({num: 8, name: 'Ago'}),
  new Month({num: 9, name: 'Set'}),
  new Month({num: 10, name: 'Out'}),
  new Month({num: 11, name: 'Nov'}),
  new Month({num: 12, name: 'Dez'}),
];

export const MONTH_NAMES_COMPLETE: Month[] = [
  new Month({num: 1, name: 'Janeiro'}),
  new Month({num: 2, name: 'Fevereiro'}),
  new Month({num: 3, name: 'Março'}),
  new Month({num: 4, name: 'Abril'}),
  new Month({num: 5, name: 'Maio'}),
  new Month({num: 6, name: 'Junho'}),
  new Month({num: 7, name: 'Julho'}),
  new Month({num: 8, name: 'Agosto'}),
  new Month({num: 9, name: 'Setembro'}),
  new Month({num: 10, name: 'Outubro'}),
  new Month({num: 11, name: 'Novembro'}),
  new Month({num: 12, name: 'Dezembro'})
];

export const DAYS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

export const getToday = (): Day => {
  const today = new Date();
  return {day: today.getDate(), month: today.getMonth(), year: today.getFullYear()} as Day;
}

export const convertToDate = (strDate: string): Day => {
  const date = new Date(strDate);
  return {day: date.getDate(), month: date.getMonth(), year: date.getFullYear()} as Day;
}

export const isToday = (day: number, month: number, year: number): boolean => {
  const today = getToday();
  return today.day == day && today.month == month && today.year == year;
}

export const isTodayYear = (year: number) => {
  return getToday().year == year;
}

export const getMonthName = (monthNumber: number) => {
  return MONTH_NAMES_COMPLETE[monthNumber].name;
}


