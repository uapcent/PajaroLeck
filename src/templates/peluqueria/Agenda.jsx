import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Field from '../../components/Field.jsx';
import { Phone } from '../../components/Icons.jsx';
import { capitalize, formatDate, fromMinutes, toMinutes } from '../../lib/dates.js';
import { price } from '../../lib/format.js';
import { telLink } from '../../lib/site.js';
import { services, stylists } from './config.js';
import { cancelBooking, listBookings } from './mockApi.js';
import { bookableDays, isOpen, serviceById } from './slots.js';
import DayPicker from './DayPicker.jsx';

// Contraseña de demostración. Un cliente real usaría el login del backend (p. ej. PocketBase).
const DEMO_PASSWORD = 'demo';

export default function Agenda() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <section className="pq-section pq-agenda">
      <div className="container">
        <h1 className="pq-title">Agenda del salón</h1>
        <p className="pq-demo">Web de ejemplo: la agenda tiene citas inventadas. Las que pidas en la web aparecen aquí hasta que recargues.</p>
        {loggedIn ? <Diary /> : <Login onLogin={() => setLoggedIn(true)} />}
      </div>
    </section>
  );
}

function Login({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const submit = (e) => {
    e.preventDefault();
    if (password === DEMO_PASSWORD) onLogin();
    else setError('Contraseña incorrecta. (Pista: es «demo»).');
  };
  return (
    <form className="pq-card pq-login" onSubmit={submit} noValidate>
      <Field label="Contraseña" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} error={error} autoComplete="current-password" hint="Para la demostración: demo" />
      <button type="submit" className="pq-btn pq-btn--primary pq-btn--block">Entrar</button>
    </form>
  );
}

function Diary() {
  const days = useMemo(bookableDays, []);
  const [params] = useSearchParams();
  const [date, setDate] = useState(() => (days.includes(params.get('fecha')) ? params.get('fecha') : days.find(isOpen)));
  const [who, setWho] = useState('all');
  const [bookings, setBookings] = useState(null);
  const [reload, setReload] = useState(0);
  const [busyId, setBusyId] = useState(null);

  useEffect(() => {
    let current = true;
    setBookings(null);
    listBookings(date).then((list) => current && setBookings(list));
    return () => {
      current = false;
    };
  }, [date, reload]);

  const cancel = async (b) => {
    if (!window.confirm(`¿Cancelar la cita de ${b.name} a las ${b.start}?`)) return;
    setBusyId(b.id);
    await cancelBooking(b.id);
    setBusyId(null);
    setReload((r) => r + 1);
  };

  const shown = bookings?.filter((b) => who === 'all' || b.stylistId === who);
  const total = shown?.reduce((sum, b) => sum + serviceById(b.serviceId, services).price, 0) ?? 0;

  return (
    <div className="pq-card pq-diary">
      <DayPicker days={days} value={date} onChange={setDate} />
      <div className="pq-diary__filters" role="group" aria-label="Filtrar por peluquero">
        {[{ id: 'all', name: 'Todos' }, ...stylists].map((s) => (
          <button key={s.id} type="button" className={`pq-chip ${who === s.id ? 'is-selected' : ''}`} aria-pressed={who === s.id} onClick={() => setWho(s.id)}>
            {s.color && <span className="pq-dot" style={{ background: s.color }} />} {s.name}
          </button>
        ))}
      </div>
      <div className="pq-diary__head">
        <h2>{capitalize(formatDate(date))}</h2>
        {shown && <span>{shown.length} citas · {price(total)}</span>}
      </div>
      {shown === undefined ? (
        <p className="pq-loading" role="status"><span className="spinner" /> Cargando…</p>
      ) : shown.length === 0 ? (
        <p className="pq-empty">No hay citas este día.</p>
      ) : (
        <ul className="pq-diary__list">
          {shown.map((b) => {
            const service = serviceById(b.serviceId, services);
            const stylist = stylists.find((s) => s.id === b.stylistId);
            return (
              <li key={b.id} className={`pq-entry ${b.isNew ? 'is-new' : ''}`} style={{ '--c': stylist.color }}>
                <span className="pq-entry__time">{b.start}<small>{fromMinutes(toMinutes(b.start) + b.duration)}</small></span>
                <div className="pq-entry__info">
                  <strong>{b.name} {b.isNew && <span className="pq-badge">Nueva</span>}</strong>
                  <span>{service.name} · {stylist.name}</span>
                </div>
                <a className="pq-entry__call" href={telLink(b.phone)} aria-label={`Llamar a ${b.name}`}><Phone width={18} height={18} /></a>
                <button type="button" className="pq-entry__cancel" onClick={() => cancel(b)} disabled={busyId === b.id}>
                  {busyId === b.id ? 'Cancelando…' : 'Cancelar'}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
