// Dates are handled as local 'YYYY-MM-DD' strings to avoid time-zone surprises.
const pad = (n) => String(n).padStart(2, '0');

export const toISODate = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export const parseISODate = (s) => {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
};

export const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);

// 'martes, 15 de octubre'
export const formatDate = (s, opts = { weekday: 'long', day: 'numeric', month: 'long' }) =>
  parseISODate(s).toLocaleDateString('es-ES', opts);

export const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// Index 0 = Sunday, as in Date.getDay()
export const weekdayNames = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

// 'HH:MM' <-> minutes since midnight
export const toMinutes = (t) => {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
};
export const fromMinutes = (n) => `${pad(Math.floor(n / 60))}:${pad(n % 60)}`;
