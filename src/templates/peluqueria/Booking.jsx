import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Field from '../../components/Field.jsx';
import PrivacyConsent from '../../components/PrivacyConsent.jsx';
import { Calendar, Check, Clock, Users, WhatsApp } from '../../components/Icons.jsx';
import { whatsappLink } from '../../lib/site.js';
import { capitalize, formatDate } from '../../lib/dates.js';
import { price } from '../../lib/format.js';
import site, { company, services, stylists } from './config.js';
import { createBooking, listBookings } from './mockApi.js';
import { bookableDays, freeSlots, isOpen, serviceById, worksOn } from './slots.js';
import DayPicker from './DayPicker.jsx';
import { downloadIcs } from './ics.js';

const ANY = 'any';
const stylistById = (id) => stylists.find((s) => s.id === id);
const emptyDetails = { name: '', phone: '', privacy: false };

// Booking card: four short steps that fold into a summary line once answered.
export default function Booking() {
  const days = useMemo(bookableDays, []);
  const [step, setStep] = useState(0);
  const [serviceId, setServiceId] = useState(null);
  const [who, setWho] = useState(ANY);
  const [date, setDate] = useState(() => days.find(isOpen));
  const [time, setTime] = useState(null);
  const [details, setDetails] = useState(emptyDetails);
  const [errors, setErrors] = useState({});
  const [slots, setSlots] = useState(null); // null = loading
  const [reload, setReload] = useState(0);
  const [notice, setNotice] = useState('');
  const [sending, setSending] = useState(false);
  const [confirmed, setConfirmed] = useState(null);

  const service = serviceById(serviceId, services);
  const dayAvailable = (d) => (who === ANY ? isOpen(d) : worksOn(stylistById(who), d));

  // Fetch the day's bookings and work out the free times.
  useEffect(() => {
    if (!service || step < 2) return;
    let current = true;
    setSlots(null);
    listBookings(date).then((existing) => current && setSlots(freeSlots(date, service.duration, existing, who, new Date())));
    return () => {
      current = false;
    };
  }, [date, service, who, step, reload]);

  const pickService = (id) => { setServiceId(id); setTime(null); setStep(1); };
  const pickWho = (id) => {
    setWho(id);
    setTime(null);
    if (id !== ANY && !worksOn(stylistById(id), date)) setDate(days.find((d) => worksOn(stylistById(id), d)));
    setStep(2);
  };
  const pickDate = (d) => { setDate(d); setTime(null); setNotice(''); };
  const pickTime = (t) => { setTime(t); setNotice(''); setStep(3); };

  const update = (e) => {
    const { name, value, type, checked } = e.target;
    setDetails((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    const found = {};
    if (!details.name.trim()) found.name = 'Dinos tu nombre.';
    if (!/^\+?[\d\s-]{9,}$/.test(details.phone.trim())) found.phone = 'Revisa el teléfono, parece incompleto.';
    if (!details.privacy) found.privacy = 'Necesitamos que aceptes la política de privacidad.';
    setErrors(found);
    if (Object.keys(found).length) return;

    setSending(true);
    try {
      const created = await createBooking({ serviceId, stylistId: who, date, start: time, name: details.name.trim(), phone: details.phone.trim() });
      setConfirmed(created);
      setDetails(emptyDetails);
    } catch (err) {
      setNotice(err.message);
      setTime(null);
      setStep(2);
      setReload((r) => r + 1);
    } finally {
      setSending(false);
    }
  };

  const restart = () => {
    setConfirmed(null);
    setServiceId(null);
    setWho(ANY);
    setTime(null);
    setStep(0);
  };

  if (confirmed) return <Confirmation booking={confirmed} onRestart={restart} />;

  const summaries = [
    service && `${service.name} · ${service.duration} min · ${price(service.price)}`,
    who === ANY ? 'Con quien esté libre' : `Con ${stylistById(who).name}`,
    time && `${capitalize(formatDate(date))} a las ${time}`,
  ];

  return (
    <div className="pq-card">
      <Step n={1} title="¿Qué te hacemos?" current={step} summary={summaries[0]} onEdit={() => setStep(0)}>
        <ul className="pq-options">
          {services.map((s) => (
            <li key={s.id}>
              <button type="button" className={`pq-option ${s.id === serviceId ? 'is-selected' : ''}`} onClick={() => pickService(s.id)}>
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

      <Step n={2} title="¿Con quién?" current={step} summary={summaries[1]} onEdit={() => setStep(1)}>
        <div className="pq-people">
          <button type="button" className={`pq-person ${who === ANY ? 'is-selected' : ''}`} onClick={() => pickWho(ANY)}>
            <span className="pq-person__avatar pq-person__avatar--any"><Users width={22} height={22} /></span>
            <span>Me da igual</span>
          </button>
          {stylists.map((s) => (
            <button key={s.id} type="button" className={`pq-person ${who === s.id ? 'is-selected' : ''}`} onClick={() => pickWho(s.id)}>
              <span className="pq-person__avatar" style={{ background: s.color }}>{s.name[0]}</span>
              <span>{s.name}</span>
            </button>
          ))}
        </div>
      </Step>

      <Step n={3} title="¿Cuándo?" current={step} summary={summaries[2]} onEdit={() => setStep(2)}>
        <DayPicker days={days} value={date} onChange={pickDate} isAvailable={dayAvailable} />
        <p className="pq-when">{capitalize(formatDate(date))}</p>
        {notice && <p className="pq-notice" role="alert">{notice}</p>}
        {slots === null ? (
          <p className="pq-loading" role="status"><span className="spinner" /> Buscando huecos libres…</p>
        ) : slots.length === 0 ? (
          <p className="pq-empty">No quedan huecos este día. Prueba con otro.</p>
        ) : (
          <div className="pq-times">
            {slots.map(({ time: t }) => (
              <button key={t} type="button" className={`pq-time ${t === time ? 'is-selected' : ''}`} onClick={() => pickTime(t)}>{t}</button>
            ))}
          </div>
        )}
      </Step>

      <Step n={4} title="Tus datos" current={step}>
        <form className="pq-form" onSubmit={submit} noValidate>
          <div className="pq-form__row">
            <Field label="Nombre" name="name" value={details.name} onChange={update} error={errors.name} autoComplete="given-name" />
            <Field label="Teléfono" name="phone" type="tel" inputMode="tel" value={details.phone} onChange={update} error={errors.phone} autoComplete="tel" hint="Solo para avisarte si hay algún cambio." />
          </div>
          <PrivacyConsent checked={details.privacy} onChange={update} error={errors.privacy} />
          <button type="submit" className="pq-btn pq-btn--primary pq-btn--block" disabled={sending}>
            {sending ? <><span className="spinner" /> Reservando…</> : 'Confirmar cita'}
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
  const service = serviceById(booking.serviceId, services);
  const stylist = stylistById(booking.stylistId);
  const when = `${capitalize(formatDate(booking.date))} a las ${booking.start}`;
  const message = `Hola, soy ${booking.name}. Tengo cita el ${formatDate(booking.date)} a las ${booking.start} (${service.name} con ${stylist.name}) y necesito cambiarla.`;

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
      <a className="pq-btn pq-btn--ghost pq-btn--block" href={whatsappLink(company.whatsapp, message)} target="_blank" rel="noopener noreferrer">
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
