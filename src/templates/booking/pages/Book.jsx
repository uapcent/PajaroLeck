import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PageBanner from '../../../components/PageBanner.jsx';
import Field from '../../../components/Field.jsx';
import PrivacyConsent from '../../../components/PrivacyConsent.jsx';
import { Calendar, Check, Clock, WhatsApp } from '../../../components/Icons.jsx';
import { whatsappLink } from '../../../lib/site.js';
import { formatDate, fromMinutes, toMinutes } from '../../../lib/dates.js';
import site, { company, services } from '../config.js';
import { price, serviceById } from '../format.js';
import { createBooking, listBookings } from '../mockApi.js';
import { freeSlots, isOpen } from '../slots.js';
import DayPicker, { bookableDays } from '../components/DayPicker.jsx';
import { downloadIcs } from '../ics.js';

const steps = [
  { id: 'service', label: 'Service' },
  { id: 'time', label: 'Day & time' },
  { id: 'details', label: 'Your details' },
];
const emptyDetails = { name: '', phone: '', email: '', notes: '', privacy: false };

export default function Book() {
  const [params] = useSearchParams();
  const days = useMemo(bookableDays, []);
  const preselected = serviceById(params.get('service'));

  const [step, setStep] = useState(preselected ? 'time' : 'service');
  const [serviceId, setServiceId] = useState(preselected?.id ?? null);
  const [date, setDate] = useState(() => days.find(isOpen));
  const [start, setStart] = useState(null);
  const [details, setDetails] = useState(emptyDetails);
  const [errors, setErrors] = useState({});
  const [slots, setSlots] = useState(null); // null = loading
  const [slotsKey, setSlotsKey] = useState(0); // bump to refetch
  const [notice, setNotice] = useState('');
  const [sending, setSending] = useState(false);
  const [booking, setBooking] = useState(null);

  const service = serviceById(serviceId);

  // Load free times whenever the day or service changes.
  useEffect(() => {
    if (!service || !date) return;
    let current = true;
    setSlots(null);
    listBookings(date).then((existing) => {
      if (current) setSlots(freeSlots(date, service.duration, existing, new Date()));
    });
    return () => {
      current = false;
    };
  }, [date, service, slotsKey]);

  const chooseService = (id) => {
    setServiceId(id);
    setStart(null);
    setStep('time');
  };
  const chooseDate = (d) => {
    setDate(d);
    setStart(null);
    setNotice('');
  };
  const chooseTime = (t) => {
    setStart(t);
    setNotice('');
    setStep('details');
  };

  const update = (e) => {
    const { name, value, type, checked } = e.target;
    setDetails((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    const found = {};
    if (!details.name.trim()) found.name = 'Please enter your name.';
    if (!/^\+?[\d\s-]{9,}$/.test(details.phone.trim())) found.phone = 'Please enter a valid phone number.';
    if (details.email && !/^\S+@\S+\.\S+$/.test(details.email)) found.email = 'Please enter a valid email or leave it empty.';
    if (!details.privacy) found.privacy = 'You must accept the privacy policy.';
    setErrors(found);
    if (Object.keys(found).length) return;

    setSending(true);
    try {
      const { privacy, ...person } = details;
      setBooking(await createBooking({ serviceId, date, start, ...person }));
      setDetails(emptyDetails);
    } catch (err) {
      setNotice(err.message);
      setStart(null);
      setStep('time');
      setSlotsKey((k) => k + 1);
    } finally {
      setSending(false);
    }
  };

  const restart = () => {
    setBooking(null);
    setServiceId(null);
    setStart(null);
    setStep('service');
    setSlotsKey((k) => k + 1);
  };

  if (booking) return <Confirmation booking={booking} onRestart={restart} />;

  const stepIndex = steps.findIndex((s) => s.id === step);
  return (
    <>
      <PageBanner eyebrow="Online booking" title="Book an appointment" />
      <section className="section">
        <div className="container booking">
          <DemoNote />
          <ol className="stepper">
            {steps.map((s, i) => (
              <li key={s.id} className={i === stepIndex ? 'is-current' : i < stepIndex ? 'is-done' : ''}>
                <button type="button" disabled={i >= stepIndex} onClick={() => setStep(s.id)}>
                  <span className="stepper__num">{i < stepIndex ? <Check width={14} height={14} /> : i + 1}</span>
                  {s.label}
                </button>
              </li>
            ))}
          </ol>

          {step === 'service' && (
            <div className="booking__panel">
              <h2 className="booking__title">What would you like?</h2>
              <div className="service-options">
                {services.map((s) => (
                  <button key={s.id} type="button" className={`service-option ${s.id === serviceId ? 'is-selected' : ''}`} onClick={() => chooseService(s.id)}>
                    <span className="service-option__name">{s.name}</span>
                    <span className="service-option__desc">{s.description}</span>
                    <span className="service-option__meta">
                      <span><Clock width={15} height={15} /> {s.duration} min</span>
                      <strong>{price(s.price)}</strong>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'time' && service && (
            <div className="booking__panel">
              <Summary service={service} />
              <h2 className="booking__title">Pick a day</h2>
              <DayPicker days={days} value={date} onChange={chooseDate} />
              <h2 className="booking__title">Pick a time <span className="booking__sub">{formatDate(date)}</span></h2>
              {notice && <p className="form__notice" role="alert">{notice}</p>}
              {slots === null ? (
                <p className="booking__loading" role="status"><span className="spinner" /> Checking availability…</p>
              ) : slots.length === 0 ? (
                <p className="booking__empty">No free times left on this day. Please try another one.</p>
              ) : (
                <div className="slots">
                  {slots.map((t) => (
                    <button key={t} type="button" className={`slot ${t === start ? 'is-selected' : ''}`} onClick={() => chooseTime(t)}>
                      {t}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {step === 'details' && service && start && (
            <div className="booking__panel">
              <Summary service={service} date={date} start={start} />
              <form className="form" onSubmit={submit} noValidate>
                <div className="form__row">
                  <Field label="Name" name="name" value={details.name} onChange={update} error={errors.name} autoComplete="name" />
                  <Field label="Phone" name="phone" type="tel" value={details.phone} onChange={update} error={errors.phone} autoComplete="tel" />
                </div>
                <Field label="Email (optional, for a reminder)" name="email" type="email" value={details.email} onChange={update} error={errors.email} autoComplete="email" />
                <Field label="Anything we should know? (optional)" name="notes" as="textarea" rows={3} value={details.notes} onChange={update} />
                <PrivacyConsent checked={details.privacy} onChange={update} error={errors.privacy} />
                <button type="submit" className="btn btn--primary" disabled={sending}>
                  {sending ? <><span className="spinner spinner--light" /> Booking…</> : 'Confirm booking'}
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function Summary({ service, date, start }) {
  return (
    <div className="booking-summary">
      <div>
        <strong>{service.name}</strong>
        <span>{service.duration} min · {price(service.price)}</span>
      </div>
      {date && start && (
        <div>
          <strong><Calendar width={16} height={16} /> {formatDate(date)}</strong>
          <span>{start} – {fromMinutes(toMinutes(start) + service.duration)}</span>
        </div>
      )}
    </div>
  );
}

function Confirmation({ booking, onRestart }) {
  const service = serviceById(booking.serviceId);
  const when = `${formatDate(booking.date)} at ${booking.start}`;
  const message = `Hi ${company.name}, this is ${booking.name}. I've booked ${service.name} on ${when} (ref. ${booking.code}).`;

  return (
    <>
      <PageBanner eyebrow="Online booking" title="You're booked in!" />
      <section className="section">
        <div className="container booking">
          <DemoNote />
          <div className="confirmation">
            <span className="confirmation__icon"><Check width={32} height={32} /></span>
            <h2 className="booking__title">See you {formatDate(booking.date)}</h2>
            <p>
              <strong>{service.name}</strong> at <strong>{booking.start}</strong> ({service.duration} min, {price(service.price)}).
              <br />
              {company.address}
            </p>
            <p className="confirmation__code">Booking reference <strong>{booking.code}</strong></p>
            <div className="confirmation__actions">
              <button type="button" className="btn btn--primary" onClick={() => downloadIcs(booking, service, company)}>
                <Calendar width={18} height={18} /> Add to calendar
              </button>
              <a className="btn btn--whatsapp" href={whatsappLink(company.whatsapp, message)} target="_blank" rel="noopener noreferrer">
                <WhatsApp width={18} height={18} /> Message the studio
              </a>
            </div>
            <p className="confirmation__more">
              <button type="button" className="link-button" onClick={onRestart}>Book another appointment</button>
              {' · '}
              <Link to={`${site.base}/admin?date=${booking.date}`}>See it in the owner area</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function DemoNote() {
  return (
    <p className="demo-note">
      <strong>Demo:</strong> this booking system uses a fake backend. Nothing is sent or stored – bookings disappear when you reload the page.
    </p>
  );
}
