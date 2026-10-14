// ---------------------------------------------------------------
// BACKEND SIMULADO – no se envía ni se guarda nada. Las citas viven en
// memoria y desaparecen al recargar la página.
//
// Para un cliente real, mantener estas funciones y cambiar su interior
// por llamadas a un backend sencillo, por ejemplo PocketBase:
//   listBookings(date)              → GET  /api/collections/citas/records?filter=(date='…')
//   listBookingsBetween(from, to)   → GET  …?filter=(date>='…' && date<='…')
//   createBooking(data)             → POST /api/collections/citas/records
//   cancelBooking(id)               → PATCH status = 'cancelada'
// El servidor debe volver a comprobar que la hora sigue libre.
// ---------------------------------------------------------------
import { booking, hours, services, stylists } from './config.js';
import { fromMinutes, parseISODate, toMinutes } from '../../lib/dates.js';
import { bookableDays, freeSlots, isOpen, serviceById, worksOn } from './slots.js';

const LATENCY = 450; // ms – retraso de red simulado, para ver los estados de carga
const wait = () => new Promise((r) => setTimeout(r, LATENCY));

let bookings = null;

// Rellena la agenda con citas inventadas para que no parezca vacía.
// Depende de la fecha, así que el mismo día siempre muestra las mismas citas.
// Algunos días salen completos, para enseñar cómo se ven en el calendario.
function seed() {
  const names = ['Laura M.', 'Javier R.', 'Marta G.', 'Pablo S.', 'Lucía F.', 'Carlos D.', 'Elena P.', 'Sergio T.', 'Ana B.', 'Diego L.', 'Rosa V.', 'Vicent C.'];
  const list = [];
  const today = bookableDays()[0];
  let firstSaturday = true;

  for (const date of bookableDays().slice(0, booking.daysAhead)) {
    if (!isOpen(date)) continue;
    let rand = [...date].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
    const next = () => (rand = (rand * 1103515245 + 12345) >>> 0) / 2 ** 32;
    const pick = (arr) => arr[Math.floor(next() * arr.length)];
    const add = (service, stylist, start) =>
      list.push({
        id: `seed-${date}-${list.length}`,
        date,
        start,
        duration: service.duration,
        serviceId: service.id,
        stylistId: stylist.id,
        name: pick(names),
        phone: `+34 6${String(Math.floor(next() * 1e8)).padStart(8, '0')}`,
        status: 'confirmada',
      });

    const weekday = parseISODate(date).getDay();
    const isSaturday = weekday === 6;
    const packed = date !== today && ((isSaturday && firstSaturday) || next() < 0.12);
    if (isSaturday) firstSaturday = false;

    if (packed) {
      // Día completo: cada peluquero, cita tras cita, sin huecos aprovechables.
      for (const stylist of stylists.filter((s) => worksOn(s, date))) {
        for (const [open, close] of hours[weekday]) {
          let t = toMinutes(open);
          for (;;) {
            const fitting = services.filter((s) => t + s.duration <= toMinutes(close));
            if (!fitting.length) break;
            const service = pick(fitting);
            add(service, stylist, fromMinutes(t));
            t += service.duration;
          }
        }
      }
      continue;
    }

    const target = 9 + Math.floor(next() * 7);
    for (let tries = 0; tries < 50 && list.filter((b) => b.date === date).length < target; tries++) {
      const service = pick(services);
      const stylist = pick(stylists);
      const free = freeSlots(date, service.duration, list.filter((b) => b.date === date), stylist.id);
      if (free.length) add(service, stylist, pick(free).time);
    }
  }
  return list;
}

const all = () => (bookings ??= seed());
const active = (date) => all().filter((b) => b.date === date && b.status !== 'cancelada');

export async function listBookings(date) {
  await wait();
  return active(date).sort((a, b) => a.start.localeCompare(b.start));
}

// All bookings between two dates (inclusive), so the calendar can tell which days are full.
export async function listBookingsBetween(from, to) {
  await wait();
  return all().filter((b) => b.date >= from && b.date <= to && b.status !== 'cancelada');
}

export async function createBooking({ serviceId, stylistId, date, start, name, phone }) {
  await wait();
  const service = serviceById(serviceId, services);
  if (!service) throw new Error('Ese servicio no existe.');
  // El "servidor" vuelve a comprobar: alguien puede haber cogido la hora mientras tanto.
  const slot = freeSlots(date, service.duration, active(date), stylistId, new Date()).find((s) => s.time === start);
  if (!slot) throw new Error('Vaya, alguien acaba de coger esa hora. Elige otra, por favor.');
  const created = {
    id: crypto.randomUUID(),
    date,
    start,
    duration: service.duration,
    serviceId,
    stylistId: slot.stylists[0],
    name,
    phone,
    status: 'confirmada',
    isNew: true,
  };
  all().push(created);
  return created;
}

export async function cancelBooking(id) {
  await wait();
  const b = all().find((x) => x.id === id);
  if (b) b.status = 'cancelada';
}
