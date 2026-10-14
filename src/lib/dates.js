// Dates are handled as local 'YYYY-MM-DD' strings to avoid time-zone surprises.
const pad = (n) => String(n).padStart(2, '0');

export const toISODate = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export const parseISODate = (s) => {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
};

export const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);

export const formatDate = (s, opts = { weekday: 'long', day: 'numeric', month: 'long' }) =>
  parseISODate(s).toLocaleDateString('en-GB', opts);

// 'HH:MM' <-> minutes since midnight
export const toMinutes = (t) => {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
};
export const fromMinutes = (n) => `${pad(Math.floor(n / 60))}:${pad(n % 60)}`;
