import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Field from '../../components/Field.jsx';
import Photo from '../../components/Photo.jsx';
import PrivacyConsent from '../../components/PrivacyConsent.jsx';
import { Calendar, Close, WhatsApp } from '../../components/Icons.jsx';
import { whatsappLink } from '../../lib/site.js';
import { capitalize, formatDate, parseISODate } from '../../lib/dates.js';
import { price } from '../../lib/format.js';
import { company, services, stylists } from '../peluqueria/config.js';
import useBooking, { ANY, describeBooking, stylistById } from '../peluqueria/useBooking.js';
import { byCategory, byPeriod } from '../peluqueria/slots.js';
import { downloadIcs } from '../peluqueria/ics.js';
import { agendaPath } from '../peluqueria/variants.js';
import { images } from './config.js';

// Booking opens in a panel that slides in from the right. Any button on the page can
// open it, optionally with a service or stylist already chosen: openBooking({ who: 'lucia' }).
const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [request, setRequest] = useState(null); // null = closed
  const value = useMemo(() => ({ request, open: (preset) => setRequest({ preset }), close: () => setRequest(null) }), [request]);
  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export const useOpenBooking = () => useContext(BookingContext).open;

const tabs = ['Servicio', 'Profesional', 'Día y hora', 'Tus datos'];

export default function BookingDrawer() {
  const { request, close } = useContext(BookingContext);
  const b = useBooking();
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (request) {
      if (request.preset) b.preset(request.preset);
      else if (b.confirmed) b.restart();
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [request]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    // Clicks on the dimmed backdrop land on the <dialog> itself and close it.
    <dialog ref={ref} className="at-drawer" aria-labelledby="at-drawer-title" onClose={close} onClick={(e) => e.target === ref.current && close()}>
      <div className="at-drawer__panel">
        <header className="at-drawer__head">
          <div>
            <p className="at-eyebrow">{company.name} · {company.tagline}</p>
            <h2 id="at-drawer-title">Reservar cita</h2>
          </div>
          <button type="button" className="at-drawer__close" onClick={close} aria-label="Cerrar"><Close /></button>
        </header>
        {b.confirmed ? <Done booking={b.confirmed} onRestart={b.restart} /> : <Steps b={b} />}
      </div>
    </dialog>
  );
}

function Steps({ b }) {
  const { step, setStep, serviceId, who, date, time, slots, details, errors, service } = b;
  return (
    <>
      <ol className="at-tabs">
        {tabs.map((label, i) => (
          <li key={label}>
            <button type="button" className={i === step ? 'is-current' : i < step ? 'is-done' : ''} disabled={i > step} aria-current={i === step ? 'step' : undefined} onClick={() => setStep(i)}>
              <span>0{i + 1}</span> {label}
            </button>
          </li>
        ))}
      </ol>

      <div className="at-drawer__body">
        {step === 0 && byCategory(services).map(([category, list]) => (
          <section key={category} className="at-pick">
            <h3>{category}</h3>
            {list.map((s) => (
              <button key={s.id} type="button" className={`at-row ${s.id === serviceId ? 'is-selected' : ''}`} onClick={() => b.pickService(s.id)}>
                <span>
                  <strong>{s.name}</strong>
                  {s.detail && <small>{s.detail}</small>}
                </span>
                <span className="at-row__meta">{s.duration} min · <strong>{price(s.price)}</strong></span>
              </button>
            ))}
          </section>
        ))}

        {step === 1 && (
          <section className="at-pick">
            <h3>¿Con quién?</h3>
            <button type="button" className={`at-row at-row--person ${who === ANY ? 'is-selected' : ''}`} onClick={() => b.pickWho(ANY)}>
              <span className="at-avatar at-avatar--any">✦</span>
              <span><strong>Sin preferencia</strong><small>Te atiende quien esté libre</small></span>
            </button>
            {stylists.map((s) => (
              <button key={s.id} type="button" className={`at-row at-row--person ${who === s.id ? 'is-selected' : ''}`} onClick={() => b.pickWho(s.id)}>
                <Photo src={images.team[s.id]?.src} alt="" className="at-avatar" />
                <span><strong>{s.name}</strong><small>{s.role}</small></span>
              </button>
            ))}
          </section>
        )}

        {step === 2 && (
          <section className="at-pick">
            <h3>¿Qué día?</h3>
            <MonthCalendar days={b.days} value={date} onChange={b.pickDate} unavailable={b.unavailable} />
            <h3 className="at-pick__date">{capitalize(formatDate(date))}</h3>
            {b.notice && <p className="at-notice" role="alert">{b.notice}</p>}
            {slots === null ? (
              <p className="at-quiet" role="status"><span className="spinner" /> Buscando horas libres…</p>
            ) : slots.length === 0 ? (
              <p className="at-quiet">No quedan horas este día. Prueba con otro.</p>
            ) : (
              byPeriod(slots).map(([period, list]) => (
                <div key={period} className="at-times">
                  <span className="at-times__label">{period}</span>
                  <div className="at-times__list">
                    {list.map(({ time: t }) => (
                      <button key={t} type="button" className={t === time ? 'is-selected' : ''} onClick={() => b.pickTime(t)}>{t}</button>
                    ))}
                  </div>
                </div>
              ))
            )}
          </section>
        )}

        {step === 3 && (
          <form className="at-pick at-form" onSubmit={b.submit} noValidate>
            <h3>Para confirmar tu cita</h3>
            <Field label="Nombre" name="name" value={details.name} onChange={b.update} error={errors.name} autoComplete="given-name" />
            <Field label="Teléfono" name="phone" type="tel" inputMode="tel" value={details.phone} onChange={b.update} error={errors.phone} autoComplete="tel" hint="Solo lo usamos si hay que cambiar algo." />
            <PrivacyConsent checked={details.privacy} onChange={b.update} error={errors.privacy} />
            <button type="submit" className="at-btn at-btn--solid at-btn--block" disabled={b.sending}>
              {b.sending ? <><span className="spinner" /> Reservando…</> : 'Confirmar cita'}
            </button>
          </form>
        )}
      </div>

      {service && (
        <footer className="at-drawer__summary" aria-label="Tu cita">
          <span className="at-eyebrow">Tu cita</span>
          <p>
            {service.name}
            {step > 1 && <> · {who === ANY ? 'sin preferencia' : `con ${stylistById(who).name}`}</>}
            {time && <> · {formatDate(date, { weekday: 'short', day: 'numeric', month: 'short' })}, {time}</>}
          </p>
          <strong>{price(service.price)}</strong>
        </footer>
      )}
    </>
  );
}

// Month-style calendar (Monday first) covering the bookable days.
function MonthCalendar({ days, value, onChange, unavailable }) {
  const lead = (parseISODate(days[0]).getDay() + 6) % 7;
  const months = [...new Set(days.map((d) => formatDate(d, { month: 'long' })))];
  return (
    <div className="at-cal">
      <p className="at-cal__months">{capitalize(months.join(' – '))}</p>
      <div className="at-cal__grid" role="radiogroup" aria-label="Día">
        {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((d) => <span key={d} className="at-cal__dow" aria-hidden="true">{d}</span>)}
        {Array.from({ length: lead }, (_, i) => <span key={`gap-${i}`} />)}
        {days.map((d) => {
          const note = unavailable(d);
          const num = parseISODate(d).getDate();
          return (
            <button
              key={d}
              type="button"
              role="radio"
              aria-checked={d === value}
              aria-label={`${formatDate(d)}${note ? `, ${note}` : ''}`}
              title={note ?? undefined}
              className={`${d === value ? 'is-selected' : ''} ${note === 'completo' ? 'is-full' : ''}`}
              disabled={!!note}
              onClick={() => onChange(d)}
            >
              {num}
            </button>
          );
        })}
      </div>
      <p className="at-cal__legend">
        <span className="at-cal__key at-cal__key--full" aria-hidden="true" /> Completo
        <span className="at-cal__key at-cal__key--off" aria-hidden="true" /> Cerrado o descansa
      </p>
    </div>
  );
}

function Done({ booking, onRestart }) {
  const { service, stylist, when, changeMessage } = describeBooking(booking);
  return (
    <div className="at-drawer__body at-done" role="status">
      <p className="at-eyebrow">Cita confirmada</p>
      <h3>Te esperamos, {booking.name}.</h3>
      <dl>
        <div><dt>Cuándo</dt><dd>{when}</dd></div>
        <div><dt>Servicio</dt><dd>{service.name} · {price(service.price)}</dd></div>
        <div><dt>Con</dt><dd>{stylist.name}</dd></div>
        <div><dt>Dónde</dt><dd>{company.address}</dd></div>
      </dl>
      <button type="button" className="at-btn at-btn--solid at-btn--block" onClick={() => downloadIcs({ booking, service, stylist, company })}>
        <Calendar width={18} height={18} /> Guardar en mi calendario
      </button>
      <a className="at-btn at-btn--line at-btn--block" href={whatsappLink(company.whatsapp, changeMessage)} target="_blank" rel="noopener noreferrer">
        <WhatsApp width={18} height={18} /> ¿Necesitas cambiarla?
      </a>
      <p className="at-done__more">
        <button type="button" className="at-link" onClick={onRestart}>Pedir otra cita</button>
        {' · '}
        <Link to={`${agendaPath}?fecha=${booking.date}`} className="at-link">Ver la agenda del salón</Link>
      </p>
      <p className="at-quiet at-quiet--small">Web de ejemplo: las citas no se guardan y desaparecen al recargar.</p>
    </div>
  );
}
