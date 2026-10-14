import { parseISODate } from '../../lib/dates.js';
import { isOpen } from './slots.js';

const closedNote = (date) => (isOpen(date) ? null : 'cerrado');

// Horizontal strip of day buttons. `unavailable(date)` returns why a day can't be picked
// ('cerrado', 'completo'…) or null when it can. Unavailable days are shown but disabled.
export default function DayPicker({ days, value, onChange, unavailable = closedNote }) {
  return (
    <div className="pq-days" role="radiogroup" aria-label="Día">
      {days.map((date) => {
        const d = parseISODate(date);
        const note = unavailable(date);
        return (
          <button
            key={date}
            type="button"
            role="radio"
            aria-checked={date === value}
            className={`pq-day ${date === value ? 'is-selected' : ''} ${note === 'completo' ? 'is-full' : ''}`}
            disabled={!!note}
            onClick={() => onChange(date)}
          >
            <span className="pq-day__dow">{d.toLocaleDateString('es-ES', { weekday: 'short' }).replace('.', '')}</span>
            <span className="pq-day__num">{d.getDate()}</span>
            <span className="pq-day__month">{note ?? d.toLocaleDateString('es-ES', { month: 'short' }).replace('.', '')}</span>
          </button>
        );
      })}
    </div>
  );
}
