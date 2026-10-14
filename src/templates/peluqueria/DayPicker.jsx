import { parseISODate } from '../../lib/dates.js';
import { isOpen } from './slots.js';

// Horizontal strip of day buttons. Closed days are shown but disabled.
export default function DayPicker({ days, value, onChange, isAvailable = isOpen }) {
  return (
    <div className="pq-days" role="radiogroup" aria-label="Día">
      {days.map((date) => {
        const d = parseISODate(date);
        const available = isAvailable(date);
        return (
          <button
            key={date}
            type="button"
            role="radio"
            aria-checked={date === value}
            className={`pq-day ${date === value ? 'is-selected' : ''}`}
            disabled={!available}
            onClick={() => onChange(date)}
          >
            <span className="pq-day__dow">{d.toLocaleDateString('es-ES', { weekday: 'short' }).replace('.', '')}</span>
            <span className="pq-day__num">{d.getDate()}</span>
            <span className="pq-day__month">{available ? d.toLocaleDateString('es-ES', { month: 'short' }).replace('.', '') : 'cerrado'}</span>
          </button>
        );
      })}
    </div>
  );
}
