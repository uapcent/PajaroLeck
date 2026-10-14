import { booking, hours, stylists } from './config.js';
import { addDays, fromMinutes, parseISODate, toISODate, toMinutes } from '../../lib/dates.js';

export const serviceById = (id, list) => list.find((s) => s.id === id);
export const isOpen = (date) => (hours[parseISODate(date).getDay()] ?? []).length > 0;
export const worksOn = (stylist, date) => isOpen(date) && stylist.days.includes(parseISODate(date).getDay());

// The bookable days, today first.
export const bookableDays = () => Array.from({ length: booking.daysAhead + 1 }, (_, i) => toISODate(addDays(new Date(), i)));

// Free start times on `date` for a service of `duration` minutes.
// Returns [{ time: 'HH:MM', stylists: ['carmen', …] }] – the stylists free at that time.
// `who` is a stylist id or 'any'. Pass `now` to hide past times / inside the minimum notice.
export function freeSlots(date, duration, bookings, who = 'any', now = null) {
  const ranges = hours[parseISODate(date).getDay()] ?? [];
  const team = stylists.filter((s) => (who === 'any' || s.id === who) && worksOn(s, date));
  const earliest = now && toISODate(now) === date ? now.getHours() * 60 + now.getMinutes() + booking.minNotice : -1;

  const busy = (stylistId, t) =>
    bookings.some((b) => b.stylistId === stylistId && t < toMinutes(b.start) + b.duration && t + duration > toMinutes(b.start));

  const slots = [];
  for (const [open, close] of ranges) {
    for (let t = toMinutes(open); t + duration <= toMinutes(close); t += booking.slotStep) {
      if (t < earliest) continue;
      const free = team.filter((s) => !busy(s.id, t)).map((s) => s.id);
      if (free.length) slots.push({ time: fromMinutes(t), stylists: free });
    }
  }
  return slots;
}
