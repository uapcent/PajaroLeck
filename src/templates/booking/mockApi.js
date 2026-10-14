// ---------------------------------------------------------------
// DEMO BACKEND – nothing is sent or stored. Bookings live in memory
// and disappear when the page reloads.
//
// For a real client, keep these function names and signatures and
// replace the bodies with calls to a small backend, e.g. PocketBase:
//   listBookings(date)  → GET  /api/collections/bookings/records?filter=(date='…')
//   createBooking(data) → POST /api/collections/bookings/records
//   cancelBooking(id)   → PATCH status = 'cancelled'
// A unique index on (date, start) in the database stops double bookings.
// ---------------------------------------------------------------
import { schedule, services } from './config.js';
import { freeSlots, isOpen } from './slots.js';
import { addDays, toISODate } from '../../lib/dates.js';
import { serviceById } from './format.js';

const LATENCY = 450; // ms – fake network delay so loading states are visible
const wait = () => new Promise((r) => setTimeout(r, LATENCY));

let bookings = null;

// Fills the diary with plausible fake appointments so the calendar looks real.
// Seeded from the date, so the same day always shows the same bookings.
function seed() {
  const names = ['Laura M.', 'Javier R.', 'Marta G.', 'Pablo S.', 'Lucía F.', 'Carlos D.', 'Elena P.', 'Sergio T.', 'Ana B.', 'Diego L.'];
  const list = [];
  for (let i = 0; i <= schedule.daysAhead; i++) {
    const date = toISODate(addDays(new Date(), i));
    if (!isOpen(date)) continue;
    let rand = [...date].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
    const next = () => (rand = (rand * 1103515245 + 12345) >>> 0) / 2 ** 32;
    const target = 4 + Math.floor(next() * 6);
    for (let tries = 0; tries < 30 && list.filter((b) => b.date === date).length < target; tries++) {
      const service = services[Math.floor(next() * services.length)];
      const free = freeSlots(date, service.duration, list.filter((b) => b.date === date));
      if (!free.length) continue;
      list.push({
        id: `seed-${date}-${tries}`,
        date,
        start: free[Math.floor(next() * free.length)],
        duration: service.duration,
        serviceId: service.id,
        name: names[Math.floor(next() * names.length)],
        phone: `+34 6${String(Math.floor(next() * 1e8)).padStart(8, '0')}`,
        status: 'confirmed',
      });
    }
  }
  return list;
}

const all = () => (bookings ??= seed());
const active = (date) => all().filter((b) => b.date === date && b.status !== 'cancelled');

export async function listBookings(date) {
  await wait();
  return active(date).sort((a, b) => a.start.localeCompare(b.start));
}

export async function createBooking({ serviceId, date, start, name, phone, email, notes }) {
  await wait();
  const service = serviceById(serviceId);
  if (!service) throw new Error('Unknown service.');
  // Re-check on "the server": someone may have taken the slot meanwhile.
  if (!freeSlots(date, service.duration, active(date), new Date()).includes(start)) {
    throw new Error('Sorry, that time was just taken. Please choose another one.');
  }
  const booking = {
    id: crypto.randomUUID(),
    code: Math.random().toString(36).slice(2, 8).toUpperCase(),
    date,
    start,
    duration: service.duration,
    serviceId,
    name,
    phone,
    email,
    notes,
    status: 'confirmed',
    isNew: true,
  };
  all().push(booking);
  return booking;
}

export async function cancelBooking(id) {
  await wait();
  const b = all().find((x) => x.id === id);
  if (b) b.status = 'cancelled';
}
