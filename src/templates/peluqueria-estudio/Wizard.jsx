import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Field from '../../components/Field.jsx';
import Photo from '../../components/Photo.jsx';
import PrivacyConsent from '../../components/PrivacyConsent.jsx';
import { ArrowLeft, ArrowRight, Calendar, Check, Close, Users, WhatsApp } from '../../components/Icons.jsx';
import { whatsappLink } from '../../lib/site.js';
import { capitalize, formatDate, parseISODate } from '../../lib/dates.js';
import { price } from '../../lib/format.js';
import { company, services, stylists } from '../peluqueria/config.js';
import useBooking, { ANY, describeBooking } from '../peluqueria/useBooking.js';
import { byPeriod } from '../peluqueria/slots.js';
import { downloadIcs } from '../peluqueria/ics.js';
import { agendaPath } from '../peluqueria/variants.js';
import { images } from './config.js';

// Full-screen booking, one big question per screen. Any button can open it, optionally
// with a service or stylist already chosen: openWizard({ serviceId: 'mechas' }).
const WizardContext = createContext(null);

export function WizardProvider({ children }) {
  const [request, setRequest] = useState(null); // null = closed
  const value = useMemo(() => ({ request, open: (preset) => setRequest({ preset }), close: () => setRequest(null) }), [request]);
  return <WizardContext.Provider value={value}>{children}</WizardContext.Provider>;
}

export const useOpenWizard = () => useContext(WizardContext).open;

const questions = ['¿Qué te hacemos?', '¿Con quién?', '¿Cuándo?', 'Último paso'];

export default function Wizard() {
  const { request, close } = useContext(WizardContext);
  const b = useBooking();
  const ref = useRef(null);
  const bodyRef = useRef(null);

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

  // Each new screen starts at the top.
  useEffect(() => {
    bodyRef.current?.scrollTo(0, 0);
  }, [b.step, b.confirmed]);

  return (
    <dialog ref={ref} className="es-wizard" aria-label="Reservar cita" onClose={close}>
      <div className="es-wizard__top">
        {b.step > 0 && !b.confirmed ? (
          <button type="button" className="es-wizard__icon" onClick={() => b.setStep(b.step - 1)} aria-label="Volver"><ArrowLeft /></button>
        ) : <span className="es-wizard__icon" aria-hidden="true" />}
        <div className="es-progress" role="progressbar" aria-valuemin={1} aria-valuemax={4} aria-valuenow={b.step + 1} aria-label="Paso">
          {questions.map((q, i) => <span key={q} className={i <= b.step || b.confirmed ? 'is-on' : ''} />)}
        </div>
        <button type="button" className="es-wizard__icon" onClick={close} aria-label="Cerrar"><Close /></button>
      </div>

      <div className="es-wizard__body" ref={bodyRef}>
        <div className="es-wizard__inner" key={b.confirmed ? 'done' : b.step}>
          {b.confirmed ? <Done booking={b.confirmed} onRestart={b.restart} /> : <Screen b={b} />}
        </div>
      </div>

      {!b.confirmed && b.service && (
        <div className="es-wizard__summary">
          {b.summaries.filter(Boolean).slice(0, b.step).map((s) => <span key={s}>{s}</span>)}
        </div>
      )}
    </dialog>
  );
}

function Screen({ b }) {
  const { step, serviceId, who, date, time, slots, details, errors } = b;
  return (
    <>
      <p className="es-wizard__count">Paso {step + 1} de 4</p>
      <h2 className="es-wizard__q">{questions[step]}</h2>

      {step === 0 && (
        <div className="es-tiles">
          {services.map((s) => (
            <button key={s.id} type="button" className={`es-tile ${s.id === serviceId ? 'is-selected' : ''}`} onClick={() => b.pickService(s.id)}>
              <span className="es-tile__name">{s.name}</span>
              <span className="es-tile__meta">{s.duration} min</span>
              <span className="es-tile__price">{price(s.price)}</span>
            </button>
          ))}
        </div>
      )}

      {step === 1 && (
        <div className="es-faces">
          <button type="button" className={`es-face es-face--any ${who === ANY ? 'is-selected' : ''}`} onClick={() => b.pickWho(ANY)}>
            <span className="es-face__img"><Users width={48} height={48} /></span>
            <span className="es-face__name">Me da igual</span>
            <span className="es-face__role">El primero libre</span>
          </button>
          {stylists.map((s) => (
            <button key={s.id} type="button" className={`es-face ${who === s.id ? 'is-selected' : ''}`} onClick={() => b.pickWho(s.id)}>
              <Photo src={images.crew[s.id]?.src} alt="" className="es-face__img" />
              <span className="es-face__name">{s.name}</span>
              <span className="es-face__role">{s.role}</span>
            </button>
          ))}
        </div>
      )}

      {step === 2 && (
        <>
          <div className="es-days" role="radiogroup" aria-label="Día">
            {b.days.map((d) => {
              const note = b.unavailable(d);
              const day = parseISODate(d);
              return (
                <button key={d} type="button" role="radio" aria-checked={d === date} disabled={!!note} onClick={() => b.pickDate(d)}
                  className={`es-day ${d === date ? 'is-selected' : ''} ${note === 'completo' ? 'is-full' : ''}`}>
                  <span>{day.toLocaleDateString('es-ES', { weekday: 'short' }).replace('.', '')}</span>
                  <strong>{day.getDate()}</strong>
                  <span>{note ?? day.toLocaleDateString('es-ES', { month: 'short' }).replace('.', '')}</span>
                </button>
              );
            })}
          </div>
          <p className="es-wizard__date">{capitalize(formatDate(date))}</p>
          {b.notice && <p className="es-notice" role="alert">{b.notice}</p>}
          {slots === null ? (
            <p className="es-quiet" role="status"><span className="spinner" /> Buscando huecos…</p>
          ) : slots.length === 0 ? (
            <p className="es-quiet">Este día está lleno. Prueba otro.</p>
          ) : (
            byPeriod(slots).map(([period, list]) => (
              <div key={period} className="es-times">
                <h3>{period}</h3>
                <div className="es-times__grid">
                  {list.map(({ time: t }) => (
                    <button key={t} type="button" className={t === time ? 'is-selected' : ''} onClick={() => b.pickTime(t)}>{t}</button>
                  ))}
                </div>
              </div>
            ))
          )}
        </>
      )}

      {step === 3 && (
        <form className="es-form" onSubmit={b.submit} noValidate>
          <Field label="Tu nombre" name="name" value={details.name} onChange={b.update} error={errors.name} autoComplete="given-name" />
          <Field label="Tu móvil" name="phone" type="tel" inputMode="tel" value={details.phone} onChange={b.update} error={errors.phone} autoComplete="tel" hint="Solo para avisarte si cambia algo." />
          <PrivacyConsent checked={details.privacy} onChange={b.update} error={errors.privacy} />
          <button type="submit" className="es-btn es-btn--lime es-btn--big" disabled={b.sending}>
            {b.sending ? <><span className="spinner" /> Reservando…</> : <>Confirmar · {price(b.service.price)} <ArrowRight /></>}
          </button>
          <p className="es-quiet es-quiet--small">Pagas en el salón. Sin señal ni tarjeta.</p>
        </form>
      )}
    </>
  );
}

function Done({ booking, onRestart }) {
  const { service, stylist, when, changeMessage } = describeBooking(booking);
  return (
    <div className="es-done" role="status">
      <span className="es-done__check"><Check width={44} height={44} /></span>
      <h2 className="es-wizard__q">¡Hecho, {booking.name}!</h2>
      <dl className="es-done__ticket">
        <div><dt>Cuándo</dt><dd>{when}</dd></div>
        <div><dt>Qué</dt><dd>{service.name}</dd></div>
        <div><dt>Con</dt><dd>{stylist.name}</dd></div>
        <div><dt>Precio</dt><dd>{price(service.price)}</dd></div>
      </dl>
      <div className="es-done__actions">
        <button type="button" className="es-btn es-btn--lime" onClick={() => downloadIcs({ booking, service, stylist, company })}>
          <Calendar width={18} height={18} /> Al calendario
        </button>
        <a className="es-btn es-btn--ghost" href={whatsappLink(company.whatsapp, changeMessage)} target="_blank" rel="noopener noreferrer">
          <WhatsApp width={18} height={18} /> Cambiarla
        </a>
      </div>
      <p className="es-done__more">
        <button type="button" className="es-link" onClick={onRestart}>Otra cita</button>
        {' · '}
        <Link to={`${agendaPath}?fecha=${booking.date}`} className="es-link">Agenda del salón</Link>
      </p>
      <p className="es-quiet es-quiet--small">Web de ejemplo: las citas no se guardan y desaparecen al recargar.</p>
    </div>
  );
}
