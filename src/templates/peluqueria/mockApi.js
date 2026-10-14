// ---------------------------------------------------------------
// BACKEND SIMULADO – no se envía ni se guarda nada. Las citas viven en
// memoria y desaparecen al recargar la página.
//
// Para un cliente real, mantener estas funciones y cambiar su interior
// por llamadas a un backend sencillo, por ejemplo PocketBase:
//   listBookings(date)  → GET  /api/collections/citas/records?filter=(date='…')
//   createBooking(data) → POST /api/collections/citas/records
//   cancelBooking(id)   → PATCH status = 'cancelada'
// El servidor debe volver a comprobar que la hora sigue libre.
// ---------------------------------------------------------------
import { booking, services, stylists } from './config.js';
import { bookableDays, freeSlots, isOpen, serviceById } from './slots.js';

const LATENCY = 450; // ms – retraso de red simulado, para ver los estados de carga
const wait = () => new Promise((r) => setTimeout(r, LATENCY));

let bookings = null;

// Rellena la agenda con citas inventadas para que no parezca vacía.
// Depende de la fecha, así que el mismo día siempre muestra las mismas citas.
function seed() {
  const names = ['Laura M.', 'Javier R.', 'Marta G.', 'Pablo S.', 'Lucía F.', 'Carlos D.', 'Elena P.', 'Sergio T.', 'Ana B.', 'Diego L.', 'Rosa V.', 'Vicent C.'];
  const list = [];
  for (const date of bookableDays().slice(0, booking.daysAhead)) {
    if (!isOpen(date)) continue;
    let rand = [...date].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
    const next = () => (rand = (rand * 1103515245 + 12345) >>> 0) / 2 ** 32;
    const target = 9 + Math.floor(next() * 7);
    for (let tries = 0; tries < 50 && list.filter((b) => b.date === date).length < target; tries++) {
      const service = services[Math.floor(next() * services.length)];
      const stylist = stylists[Math.floor(next() * stylists.length)];
      const free = freeSlots(date, service.duration, list.filter((b) => b.date === date), stylist.id);
      if (!free.length) continue;
      list.push({
        id: `seed-${date}-${tries}`,
        date,
        start: free[Math.floor(next() * free.length)].time,
        duration: service.duration,
        serviceId: service.id,
        stylistId: stylist.id,
        name: names[Math.floor(next() * names.length)],
        phone: `+34 6${String(Math.floor(next() * 1e8)).padStart(8, '0')}`,
        status: 'confirmada',
      });
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
