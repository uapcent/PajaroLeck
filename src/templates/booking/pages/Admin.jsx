import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageBanner from '../../../components/PageBanner.jsx';
import Field from '../../../components/Field.jsx';
import { Phone } from '../../../components/Icons.jsx';
import { formatDate, fromMinutes, toMinutes } from '../../../lib/dates.js';
import { price, serviceById } from '../format.js';
import { cancelBooking, listBookings } from '../mockApi.js';
import { isOpen } from '../slots.js';
import DayPicker, { bookableDays } from '../components/DayPicker.jsx';

// Demo password. A real build would use the backend's login (e.g. PocketBase auth).
const DEMO_PASSWORD = 'demo';

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <>
      <PageBanner eyebrow="Owner area" title="Appointments" />
      <section className="section">
        <div className="container booking">
          <p className="demo-note">
            <strong>Demo:</strong> the diary is filled with fake appointments. Bookings you make on the booking page show up here until you reload.
          </p>
          {loggedIn ? <Diary /> : <Login onLogin={() => setLoggedIn(true)} />}
        </div>
      </section>
    </>
  );
}

function Login({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const submit = (e) => {
    e.preventDefault();
    if (password === DEMO_PASSWORD) onLogin();
    else setError('Wrong password. (Hint: it’s “demo”.)');
  };
  return (
    <form className="form login" onSubmit={submit} noValidate>
      <h2 className="booking__title">Sign in</h2>
      <Field label="Password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} error={error} autoComplete="current-password" />
      <p className="login__hint">Demo password: <code>{DEMO_PASSWORD}</code></p>
      <button type="submit" className="btn btn--primary">Sign in</button>
    </form>
  );
}

function Diary() {
  const days = useMemo(bookableDays, []);
  const [params] = useSearchParams();
  const [date, setDate] = useState(() => (days.includes(params.get('date')) ? params.get('date') : days.find(isOpen)));
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
    if (!window.confirm(`Cancel ${b.name}'s appointment at ${b.start}?`)) return;
    setBusyId(b.id);
    await cancelBooking(b.id);
    setBusyId(null);
    setReload((r) => r + 1);
  };

  const revenue = bookings?.reduce((sum, b) => sum + serviceById(b.serviceId).price, 0) ?? 0;

  return (
    <div className="booking__panel">
      <DayPicker days={days} value={date} onChange={setDate} />
      <div className="diary__head">
        <h2 className="booking__title">{formatDate(date)}</h2>
        {bookings && <span className="diary__stats">{bookings.length} appointments · {price(revenue)} expected</span>}
      </div>
      {bookings === null ? (
        <p className="booking__loading" role="status"><span className="spinner" /> Loading…</p>
      ) : bookings.length === 0 ? (
        <p className="booking__empty">No appointments on this day.</p>
      ) : (
        <ul className="diary">
          {bookings.map((b) => {
            const service = serviceById(b.serviceId);
            return (
              <li key={b.id} className={`diary__item ${b.isNew ? 'is-new' : ''}`}>
                <span className="diary__time">{b.start}<small>{fromMinutes(toMinutes(b.start) + b.duration)}</small></span>
                <div className="diary__info">
                  <strong>{b.name} {b.isNew && <span className="badge">New</span>}</strong>
                  <span>{service.name} · {price(service.price)}</span>
                  {b.notes && <em>“{b.notes}”</em>}
                </div>
                <a className="diary__call" href={`tel:${b.phone.replace(/\s/g, '')}`} aria-label={`Call ${b.name}`}><Phone width={18} height={18} /></a>
                <button type="button" className="diary__cancel" onClick={() => cancel(b)} disabled={busyId === b.id}>
                  {busyId === b.id ? 'Cancelling…' : 'Cancel'}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
