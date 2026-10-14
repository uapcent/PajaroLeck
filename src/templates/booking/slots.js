import { schedule } from './config.js';
import { parseISODate, toMinutes, fromMinutes, toISODate } from '../../lib/dates.js';

export const isOpen = (date) => (schedule.hours[parseISODate(date).getDay()] ?? []).length > 0;

// Free start times on `date` for a service lasting `duration` minutes,
// given that day's existing bookings ({ start: 'HH:MM', duration }).
// Pass `now` to hide times in the past / inside the minimum notice.
export function freeSlots(date, duration, bookings, now = null) {
  const ranges = schedule.hours[parseISODate(date).getDay()] ?? [];
  const taken = bookings.map((b) => [toMinutes(b.start), toMinutes(b.start) + b.duration]);
  const earliest = now && toISODate(now) === date ? now.getHours() * 60 + now.getMinutes() + schedule.minNotice : -1;

  const slots = [];
  for (const [open, close] of ranges) {
    for (let t = toMinutes(open); t + duration <= toMinutes(close); t += schedule.slotStep) {
      if (t < earliest) continue;
      if (taken.some(([s, e]) => t < e && t + duration > s)) continue;
      slots.push(fromMinutes(t));
    }
  }
  return slots;
}
