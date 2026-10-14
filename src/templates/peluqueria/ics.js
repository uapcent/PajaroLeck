import { fromMinutes, toMinutes } from '../../lib/dates.js';

// Genera y descarga un archivo .ics para añadir la cita a cualquier calendario.
const stamp = (date, time) => `${date.replace(/-/g, '')}T${time.replace(':', '')}00`;
const escape = (s) => s.replace(/[\\,;]/g, (c) => `\\${c}`).replace(/\n/g, '\\n');

export function downloadIcs({ booking, service, stylist, company }) {
  const end = fromMinutes(toMinutes(booking.start) + booking.duration);
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//PajaroLeck//Citas//ES',
    'BEGIN:VEVENT',
    `UID:${booking.id}`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').slice(0, 15)}Z`,
    `DTSTART:${stamp(booking.date, booking.start)}`,
    `DTEND:${stamp(booking.date, end)}`,
    `SUMMARY:${escape(`${service.name} con ${stylist.name} – ${company.name}`)}`,
    `LOCATION:${escape(company.address)}`,
    `DESCRIPTION:${escape(`¿Necesitas cambiar la cita? Llama al ${company.phone}.`)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
  const a = Object.assign(document.createElement('a'), { href: url, download: `cita-${company.name.toLowerCase()}.ics` });
  a.click();
  URL.revokeObjectURL(url);
}
