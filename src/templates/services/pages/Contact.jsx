import { useState } from 'react';
import PageBanner from '../../../components/PageBanner.jsx';
import PrivacyConsent from '../../../components/PrivacyConsent.jsx';
import Field from '../../../components/Field.jsx';
import Eyebrow from '../../../components/Eyebrow.jsx';
import { MapPin, Mail, Phone, WhatsApp } from '../../../components/Icons.jsx';
import { whatsappLink } from '../../../lib/site.js';
import { company, whatsapp } from '../config.js';

const empty = { name: '', email: '', phone: '', message: '', privacy: false };

export default function Contact() {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const update = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Please enter your name.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Please enter a valid email.';
    if (form.message.trim().length < 10) e.message = 'Message must be at least 10 characters.';
    if (!form.privacy) e.privacy = 'You must accept the privacy policy.';
    return e;
  };

  const submit = async (e) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length) return;

    // TODO (per client): send the form somewhere, e.g.
    // await fetch('https://formspree.io/f/XXXX', { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(e.target) });
    setSent(true);
    setForm(empty);
  };

  return (
    <>
      <PageBanner eyebrow="Get in touch" title="Contact" />
      <section className="section">
        <div className="container contact">
          <div className="contact__info">
            <Eyebrow>Contact us</Eyebrow>
            <h2 className="section-title">
              Let's talk about <span className="text-accent">your project</span>
            </h2>
            <p>Tell us what you need and we'll get back to you within one business day.</p>
            <ul className="contact__list">
              <li><span className="contact__icon"><MapPin /></span>{company.address}</li>
              <li><span className="contact__icon"><Mail /></span><a href={`mailto:${company.email}`}>{company.email}</a></li>
              <li><span className="contact__icon"><Phone /></span>{company.phones.join(' / ')}</li>
            </ul>
            {whatsapp && (
              <a className="btn btn--whatsapp contact__whatsapp" href={whatsappLink(whatsapp.number, whatsapp.message)} target="_blank" rel="noopener noreferrer">
                <WhatsApp width={20} height={20} /> Chat on WhatsApp
              </a>
            )}
          </div>

          <form className="form" onSubmit={submit} noValidate>
            {sent && <p className="form__success" role="status">Thank you! Your message has been sent.</p>}
            <div className="form__row">
              <Field label="Name" name="name" value={form.name} onChange={update} error={errors.name} />
              <Field label="Email" name="email" type="email" value={form.email} onChange={update} error={errors.email} />
            </div>
            <Field label="Phone (optional)" name="phone" type="tel" value={form.phone} onChange={update} />
            <Field label="Message" name="message" as="textarea" value={form.message} onChange={update} error={errors.message} />
            <PrivacyConsent checked={form.privacy} onChange={update} error={errors.privacy} />
            <button type="submit" className="btn btn--primary">Send message</button>
          </form>
        </div>
      </section>
    </>
  );
}
