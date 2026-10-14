import { addDays, parseISODate, toISODate } from '../../../lib/dates.js';
import { schedule } from '../config.js';
import { isOpen } from '../slots.js';

// The bookable days, today first.
export const bookableDays = () => Array.from({ length: schedule.daysAhead + 1 }, (_, i) => toISODate(addDays(new Date(), i)));

// Horizontal strip of day buttons. Closed days are shown but disabled.
export default function DayPicker({ days, value, onChange }) {
  return (
    <div className="days" role="radiogroup" aria-label="Day">
      {days.map((date) => {
        const d = parseISODate(date);
        const open = isOpen(date);
        return (
          <button
            key={date}
            type="button"
            role="radio"
            aria-checked={date === value}
            className={`day ${date === value ? 'is-selected' : ''}`}
            disabled={!open}
            onClick={() => onChange(date)}
          >
            <span className="day__dow">{d.toLocaleDateString('en-GB', { weekday: 'short' })}</span>
            <span className="day__num">{d.getDate()}</span>
            <span className="day__month">{open ? d.toLocaleDateString('en-GB', { month: 'short' }) : 'Closed'}</span>
          </button>
        );
      })}
    </div>
  );
}
