import { differenceInDays, formatDistance, parseISO } from 'date-fns';

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (dateStr1: string | Date, dateStr2: string | Date) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = (dateStr: string) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace('about ', '')
    .replace('in', 'En')
    .replace('month', 'mes');


interface GetTodayOptions {
  end?: boolean;
}

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options: GetTodayOptions = {}) {
  const today = new Date();

  // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('es', { style: 'currency', currency: 'EUR' }).format(
    value
  );

export function getEmailError(email: string) {
  const trimmed = email.trim();

  // 1. Vacío
  if (!trimmed) return "El correo está vacío.";

  // 2. Espacios o caracteres raros
  if (/\s/.test(email)) return "El correo contiene espacios o caracteres no válidos.";

  // 3. Dominio prohibido o de pruebas
  const dominio = trimmed.split("@")[1];
  const dominiosBloqueados = [
    "test.com",
    "test",
    "example.com",
    "example.org",
    "localhost",
  ];

  if (dominiosBloqueados.includes(dominio))
    return `El dominio @${dominio} no es válido porque es un dominio de pruebas.`;

  // 4. Formato email inválido
  const regexBasico = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regexBasico.test(trimmed))
    return "El correo no tiene un formato válido.";

  return null; // válido
}


