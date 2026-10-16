import { Link } from 'react-router-dom';
import Field from '../../components/Field.jsx';
import PrivacyConsent from '../../components/PrivacyConsent.jsx';
import { Calendar, Check, Clock, Users, WhatsApp } from '../../components/Icons.jsx';
import { whatsappLink } from '../../lib/site.js';
import { capitalize, formatDate } from '../../lib/dates.js';
import { price } from '../../lib/format.js';
import site, { company, services, stylists } from './config.js';
import useBooking, { ANY, describeBooking } from './useBooking.js';
import DayPicker from './DayPicker.jsx';
import { downloadIcs } from './ics.js';

// Booking card: four short steps that fold into a summary line once answered.
export default function Booking() {
  const b = useBooking();
  const { step, setStep, serviceId, who, date, time, slots, details, errors } = b;

  if (b.confirmed) return <Confirmation booking={b.confirmed} onRestart={b.restart} />;

  return (
    <div className="pq-card">
      <Step n={1} title="¿Qué te hacemos?" current={step} summary={b.summaries[0]} onEdit={() => setStep(0)}>
        <ul className="pq-options">
          {services.map((s) => (
            <li key={s.id}>
              <button type="button" className={`pq-option ${s.id === serviceId ? 'is-selected' : ''}`} onClick={() => b.pickService(s.id)}>
                <span className="pq-option__main">
                  <strong>{s.name}</strong>
                  {s.detail && <span>{s.detail}</span>}
                </span>
                <span className="pq-option__meta">
                  <span><Clock width={15} height={15} /> {s.duration} min</span>
                  <strong>{price(s.price)}</strong>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </Step>

      <Step n={2} title="¿Con quién?" current={step} summary={b.summaries[1]} onEdit={() => setStep(1)}>
        <div className="pq-people">
          <button type="button" className={`pq-person ${who === ANY ? 'is-selected' : ''}`} onClick={() => b.pickWho(ANY)}>
            <span className="pq-person__avatar pq-person__avatar--any"><Users width={22} height={22} /></span>
            <span>Me da igual</span>
          </button>
          {stylists.map((s) => (
            <button key={s.id} type="button" className={`pq-person ${who === s.id ? 'is-selected' : ''}`} onClick={() => b.pickWho(s.id)}>
              <span className="pq-person__avatar" style={{ background: s.color }}>{s.name[0]}</span>
              <span>{s.name}</span>
            </button>
          ))}
        </div>
      </Step>

      <Step n={3} title="¿Cuándo?" current={step} summary={b.summaries[2]} onEdit={() => setStep(2)}>
        <DayPicker days={b.days} value={date} onChange={b.pickDate} unavailable={b.unavailable} />
        <p className="pq-when">{capitalize(formatDate(date))}</p>
        {b.notice && <p className="pq-notice" role="alert">{b.notice}</p>}
        {slots === null ? (
          <p className="pq-loading" role="status"><span className="spinner" /> Buscando huecos libres…</p>
        ) : slots.length === 0 ? (
          <p className="pq-empty">No quedan huecos este día. Prueba con otro.</p>
        ) : (
          <div className="pq-times">
            {slots.map(({ time: t }) => (
              <button key={t} type="button" className={`pq-time ${t === time ? 'is-selected' : ''}`} onClick={() => b.pickTime(t)}>{t}</button>
            ))}
          </div>
        )}
      </Step>

      <Step n={4} title="Tus datos" current={step}>
        <form className="pq-form" onSubmit={b.submit} noValidate>
          <div className="pq-form__row">
            <Field label="Nombre" name="name" value={details.name} onChange={b.update} error={errors.name} autoComplete="given-name" />
            <Field label="Teléfono" name="phone" type="tel" inputMode="tel" value={details.phone} onChange={b.update} error={errors.phone} autoComplete="tel" hint="Solo para avisarte si hay algún cambio." />
          </div>
          <PrivacyConsent checked={details.privacy} onChange={b.update} error={errors.privacy} />
          <button type="submit" className="pq-btn pq-btn--primary pq-btn--block" disabled={b.sending}>
            {b.sending ? <><span className="spinner" /> Reservando…</> : 'Confirmar cita'}
          </button>
        </form>
      </Step>
    </div>
  );
}

function Step({ n, title, current, summary, onEdit, children }) {
  const index = n - 1;
  const done = index < current;
  const open = index === current;
  return (
    <section className={`pq-step ${open ? 'is-open' : ''} ${done ? 'is-done' : ''}`} aria-current={open ? 'step' : undefined}>
      <header className="pq-step__head">
        <span className="pq-step__num">{done ? <Check width={16} height={16} /> : n}</span>
        <div className="pq-step__titles">
          <h3>{title}</h3>
          {done && summary && <p>{summary}</p>}
        </div>
        {done && <button type="button" className="pq-step__edit" onClick={onEdit}>Cambiar</button>}
      </header>
      {open && <div className="pq-step__body">{children}</div>}
    </section>
  );
}

function Confirmation({ booking, onRestart }) {
  const { service, stylist, when, changeMessage } = describeBooking(booking);

  return (
    <div className="pq-card pq-done" role="status">
      <span className="pq-done__icon"><Check width={34} height={34} /></span>
      <h3>¡Cita confirmada, {booking.name}!</h3>
      <dl className="pq-done__details">
        <div><dt>Cuándo</dt><dd>{when}</dd></div>
        <div><dt>Qué</dt><dd>{service.name} · {price(service.price)}</dd></div>
        <div><dt>Con</dt><dd>{stylist.name}</dd></div>
      </dl>
      <button type="button" className="pq-btn pq-btn--primary pq-btn--block" onClick={() => downloadIcs({ booking, service, stylist, company })}>
        <Calendar width={18} height={18} /> Guardar en mi calendario
      </button>
      <a className="pq-btn pq-btn--ghost pq-btn--block" href={whatsappLink(company.whatsapp, changeMessage)} target="_blank" rel="noopener noreferrer">
        <WhatsApp width={18} height={18} /> ¿Necesitas cambiarla? Escríbenos
      </a>
      <p className="pq-done__more">
        <button type="button" className="pq-link" onClick={onRestart}>Pedir otra cita</button>
        {' · '}
        <Link to={`${site.base}/agenda?fecha=${booking.date}`} className="pq-link">Ver la agenda del salón</Link>
      </p>
      <p className="pq-demo">Web de ejemplo: las citas no se guardan y desaparecen al recargar.</p>
    </div>
  );
}
