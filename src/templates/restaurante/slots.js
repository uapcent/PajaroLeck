import { addDays, fromMinutes, toISODate, toMinutes } from '../../lib/dates.js';
import { hours, reservation } from './config.js';

// Open days for the next `daysAhead` days, today first.
export const reservationDays = (now = new Date()) =>
  Array.from({ length: reservation.daysAhead }, (_, i) => addDays(now, i)).filter((d) => hours[d.getDay()]?.length && reservationTimes(toISODate(d), now).length);

// Bookable times for a day, grouped by service: [['Comida', ['13:00', …]], ['Cena', […]]]
export function reservationTimes(date, now = new Date()) {
  const [y, m, d] = date.split('-').map(Number);
  const day = new Date(y, m - 1, d).getDay();
  const earliest = toISODate(now) === date ? now.getHours() * 60 + now.getMinutes() + 30 : 0;
  return (hours[day] ?? [])
    .map(([open, close]) => {
      const times = [];
      for (let t = toMinutes(open); t <= toMinutes(close) - reservation.lastBookingBeforeClose; t += reservation.slotStep) {
        if (t >= earliest) times.push(fromMinutes(t));
      }
      return [toMinutes(open) < 17 * 60 ? 'Comida' : 'Cena', times];
    })
    .filter(([, times]) => times.length);
}
