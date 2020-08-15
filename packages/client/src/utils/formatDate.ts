import { parseISO } from 'date-fns';

export const formatDate = (date: Date): Date => {
  const d = new Date(date);
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  const yymmdd = [year, month, day].join('-');

  const parser = parseISO(yymmdd);

  return parser;
};

export const getDayMonth = (dateFormatted: Date): string => {
  const d = new Date(dateFormatted);
  const ye = new Intl.DateTimeFormat('pt-BR', { year: 'numeric' }).format(d);
  const mo = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(d);
  const da = new Intl.DateTimeFormat('pt-BR', { day: '2-digit' }).format(d);

  return `${da} de ${mo} de ${ye}`;
};

export const defaultDateToday = (date: Date): string => {
  const d = new Date(date);
  const ye = new Intl.DateTimeFormat('pt-BR', { year: 'numeric' }).format(d);
  const mo = new Intl.DateTimeFormat('pt-BR', { month: '2-digit' }).format(d);
  const da = new Intl.DateTimeFormat('pt-BR', { day: '2-digit' }).format(d);

  return `${ye}-${mo}-${da}`;
};
