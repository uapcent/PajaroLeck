import { fromMinutes, toMinutes } from '../../lib/dates.js';

// Builds and downloads an .ics file so the customer can add the appointment to any calendar app.
const stamp = (date, time) => `${date.replace(/-/g, '')}T${time.replace(':', '')}00`;
const escape = (s) => s.replace(/[\\,;]/g, (c) => `\\${c}`).replace(/\n/g, '\\n');

export function downloadIcs(booking, service, company) {
  const end = fromMinutes(toMinutes(booking.start) + booking.duration);
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//PajaroLeck//Booking//EN',
    'BEGIN:VEVENT',
    `UID:${booking.id}`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').slice(0, 15)}Z`,
    `DTSTART:${stamp(booking.date, booking.start)}`,
    `DTEND:${stamp(booking.date, end)}`,
    `SUMMARY:${escape(`${service.name} – ${company.name}`)}`,
    `LOCATION:${escape(company.address)}`,
    `DESCRIPTION:${escape(`Booking reference ${booking.code}. Need to change it? Call ${company.phones[0]}.`)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
  const a = Object.assign(document.createElement('a'), { href: url, download: `${company.name}-appointment.ics` });
  a.click();
  URL.revokeObjectURL(url);
}
