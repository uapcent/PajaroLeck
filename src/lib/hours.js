// Weekly opening hours, shared format for all templates:
//   { 0: [], 1: [['13:00', '16:00'], ['20:00', '23:30']], … }   (0 = Sunday, [] = closed)
import { toMinutes, weekdayNames } from './dates.js';

const mondayFirst = [1, 2, 3, 4, 5, 6, 0];
const rangeText = (ranges) => ranges.map(([a, b]) => `${a} – ${b}`).join(' y ');

// Groups days with the same hours: [['Martes a jueves', '13:00 – 16:00 y 20:00 – 23:30'], ['Lunes', 'Cerrado']]
export function hoursRows(hours) {
  const groups = [];
  for (const day of mondayFirst) {
    const text = hours[day]?.length ? rangeText(hours[day]) : 'Cerrado';
    const last = groups.at(-1);
    if (last && last.text === text) last.days.push(day);
    else groups.push({ days: [day], text });
  }
  return groups.map(({ days, text }) => {
    const first = weekdayNames[days[0]];
    const label =
      days.length === 1 ? first : days.length === 2 ? `${first} y ${weekdayNames[days[1]]}` : `${first} a ${weekdayNames[days.at(-1)]}`;
    return [label.charAt(0).toUpperCase() + label.slice(1), text];
  });
}

// "Abierto ahora · cierra a las 16:00", "Cerrado · abre hoy a las 20:00", "Hoy cerrado · abre mañana a las 13:00"…
export function openStatus(hours, now = new Date()) {
  const today = now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();
  const ranges = hours[today] ?? [];

  const current = ranges.find(([a, b]) => minutes >= toMinutes(a) && minutes < toMinutes(b));
  if (current) return { open: true, text: `Abierto ahora · cierra a las ${current[1]}` };

  const later = ranges.find(([a]) => toMinutes(a) > minutes);
  if (later) return { open: false, text: `Ahora cerrado · abre hoy a las ${later[0]}` };

  for (let i = 1; i <= 7; i++) {
    const day = (today + i) % 7;
    if (hours[day]?.length) {
      const when = i === 1 ? 'mañana' : `el ${weekdayNames[day]}`;
      return { open: false, text: `${ranges.length ? 'Ahora cerrado' : 'Hoy cerrado'} · abre ${when} a las ${hours[day][0][0]}` };
    }
  }
  return { open: false, text: 'Cerrado' };
}

