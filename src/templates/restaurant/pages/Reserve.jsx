import { useState } from 'react';
import PageBanner from '../../../components/PageBanner.jsx';
import Eyebrow from '../../../components/Eyebrow.jsx';
import Field from '../../../components/Field.jsx';
import OpeningHours from '../../../components/OpeningHours.jsx';
import PrivacyConsent from '../../../components/PrivacyConsent.jsx';
import { WhatsApp, Phone } from '../../../components/Icons.jsx';
import { whatsappLink } from '../../../lib/site.js';
import { toISODate, formatDate } from '../../../lib/dates.js';
import { company, maxPartySize, openingHours, reservationTimes, whatsapp } from '../config.js';

const today = toISODate(new Date());
const empty = { date: today, time: reservationTimes[0], people: '2', name: '', notes: '', privacy: false };

// No backend: the form builds a WhatsApp message the restaurant confirms by hand.
export default function Reserve() {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});

  const update = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const submit = (e) => {
    e.preventDefault();
    const found = {};
    if (!form.date || form.date < today) found.date = 'Please pick a date from today on.';
    if (!form.name.trim()) found.name = 'Please enter your name.';
    if (!form.privacy) found.privacy = 'You must accept the privacy policy.';
    setErrors(found);
    if (Object.keys(found).length) return;

    const text = [
      `Hi ${company.name}! I'd like to book a table:`,
      `• ${formatDate(form.date)} at ${form.time}`,
      `• ${form.people} ${form.people === '1' ? 'person' : 'people'}`,
      `• Name: ${form.name.trim()}`,
      form.notes.trim() && `• Notes: ${form.notes.trim()}`,
    ].filter(Boolean).join('\n');
    window.open(whatsappLink(whatsapp.number, text), '_blank', 'noopener');
  };

  return (
    <>
      <PageBanner eyebrow="Reservations" title="Book a table" />
      <section className="section">
        <div className="container contact">
          <div className="contact__info">
            <Eyebrow>We'll keep a seat for you</Eyebrow>
            <h2 className="section-title">
              Reserve on <span className="text-accent">WhatsApp</span>
            </h2>
            <p>Fill in the form and we'll open WhatsApp with your request ready to send. We confirm every booking personally, usually within the hour.</p>
            <p>For groups over {maxPartySize}, please call us.</p>
            <ul className="contact__list">
              <li><span className="contact__icon"><Phone /></span><a href={`tel:${company.phones[0].replace(/\s/g, '')}`}>{company.phones[0]}</a></li>
            </ul>
            <OpeningHours rows={openingHours} />
          </div>

          <form className="form" onSubmit={submit} noValidate>
            <div className="form__row">
              <Field label="Date" name="date" type="date" min={today} value={form.date} onChange={update} error={errors.date} />
              <Field label="Time" name="time" as="select" value={form.time} onChange={update}>
                {reservationTimes.map((t) => <option key={t}>{t}</option>)}
              </Field>
            </div>
            <div className="form__row">
              <Field label="People" name="people" as="select" value={form.people} onChange={update}>
                {Array.from({ length: maxPartySize }, (_, i) => String(i + 1)).map((n) => <option key={n}>{n}</option>)}
              </Field>
              <Field label="Name" name="name" value={form.name} onChange={update} error={errors.name} autoComplete="name" />
            </div>
            <Field label="Notes (optional)" name="notes" as="textarea" rows={3} value={form.notes} onChange={update} placeholder="Allergies, high chair, terrace…" />
            <PrivacyConsent checked={form.privacy} onChange={update} error={errors.privacy} />
            <button type="submit" className="btn btn--whatsapp">
              <WhatsApp width={20} height={20} /> Send request on WhatsApp
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
