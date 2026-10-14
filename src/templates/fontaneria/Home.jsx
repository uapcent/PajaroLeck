import { useState } from 'react';
import Field from '../../components/Field.jsx';
import PrivacyConsent from '../../components/PrivacyConsent.jsx';
import * as Icons from '../../components/Icons.jsx';
import { telLink, whatsappLink } from '../../lib/site.js';
import { price } from '../../lib/format.js';
import BeforeAfter from './BeforeAfter.jsx';
import { callbackTopics, company, facts, hero, jobs, rating, reviews, services, steps, towns, whatsappMessage } from './config.js';

const { Check, GoogleG, Phone, Star, WhatsApp } = Icons;

function Stars({ size = 18 }) {
  return (
    <span className="fx-stars" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => <Star key={i} width={size} height={size} />)}
    </span>
  );
}

const score = rating.score.toLocaleString('es-ES');

export default function Home() {
  return (
    <>
      <Hero />
      <section className="fx-facts" aria-label="Datos de la empresa">
        <div className="container fx-facts__grid">
          {facts.map((f) => (
            <div key={f.label} className="fx-fact">
              <strong>{f.value}</strong>
              <span>{f.label}</span>
            </div>
          ))}
        </div>
      </section>
      <Services />
      <Jobs />
      <Reviews />
      <Steps />
      <Zone />
      <Contact />
    </>
  );
}

function Hero() {
  return (
    <section className="fx-hero">
      <div className="container fx-hero__grid">
        <div>
          <a className="fx-rating" href="#opiniones">
            <GoogleG />
            <strong>{score}</strong>
            <Stars />
            <span>{rating.count} opiniones en Google</span>
          </a>
          <h1 className="fx-hero__title">{hero.title}</h1>
          <p className="fx-hero__text">{hero.text}</p>
          <ul className="fx-hero__promises">
            {hero.promises.map((p) => (
              <li key={p}><Check /> {p}</li>
            ))}
          </ul>
        </div>

        <div className="fx-ticket">
          <p className="fx-ticket__label">¿Tienes una urgencia?</p>
          <a className="fx-ticket__phone" href={telLink(company.phone)}>
            <Phone width={30} height={30} /> {company.phone}
          </a>
          <p className="fx-ticket__note">Te atendemos nosotros, no una centralita.</p>
          <a className="fx-btn fx-btn--call fx-btn--block" href={telLink(company.phone)}>
            <Phone width={20} height={20} /> Llamar ahora
          </a>
          <a className="fx-btn fx-btn--wa fx-btn--block" href={whatsappLink(company.whatsapp, whatsappMessage)} target="_blank" rel="noopener noreferrer">
            <WhatsApp width={20} height={20} /> Enviar una foto por WhatsApp
          </a>
          <p className="fx-ticket__free">Presupuesto gratis y sin compromiso</p>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="servicios" className="fx-section">
      <div className="container">
        <p className="fx-kicker">Lo que hacemos</p>
        <h2 className="fx-title">Servicios</h2>
        <div className="fx-services">
          {services.map((s) => {
            const Icon = Icons[s.icon];
            return (
              <article key={s.title} className="fx-service">
                <span className="fx-service__icon"><Icon width={28} height={28} /></span>
                {s.urgent && <span className="fx-service__badge">Urgencias</span>}
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <p className="fx-service__price">{s.from ? <>Desde <strong>{price(s.from)}</strong></> : <strong>Presupuesto cerrado</strong>}</p>
              </article>
            );
          })}
        </div>
        <p className="fx-note">Precios con IVA. El desplazamiento dentro de Castellón no se cobra.</p>
      </div>
    </section>
  );
}

function Jobs() {
  return (
    <section id="trabajos" className="fx-section fx-section--tint">
      <div className="container">
        <p className="fx-kicker">Mueve la barra para comparar</p>
        <h2 className="fx-title">Antes y después</h2>
        <div className="fx-jobs">
          {jobs.map((job) => (
            <figure key={job.title} className="fx-job">
              <BeforeAfter before={job.before} after={job.after} label={job.title} />
              <figcaption>
                <strong>{job.title}</strong>
                <span>{job.place}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section id="opiniones" className="fx-section">
      <div className="container">
        <p className="fx-kicker">Lo que dicen nuestros clientes</p>
        <h2 className="fx-title">Opiniones</h2>
        <div className="fx-reviews">
          <div className="fx-reviews__summary">
            <GoogleG width={32} height={32} />
            <strong className="fx-reviews__score">{score}</strong>
            <Stars size={24} />
            <span>{rating.count} opiniones en Google</span>
            <a href={rating.url} target="_blank" rel="noopener noreferrer" className="fx-link">Ver todas en Google</a>
          </div>
          <ul className="fx-reviews__list">
            {reviews.map((r) => (
              <li key={r.name} className="fx-review">
                <div className="fx-review__head">
                  <span className="fx-review__avatar" aria-hidden="true">{r.name[0]}</span>
                  <div>
                    <strong>{r.name}</strong>
                    <span>{r.when}</span>
                  </div>
                </div>
                <Stars size={16} />
                <p>{r.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Steps() {
  return (
    <section className="fx-section fx-section--dark">
      <div className="container">
        <p className="fx-kicker">Sin sorpresas</p>
        <h2 className="fx-title">Así trabajamos</h2>
        <ol className="fx-steps">
          {steps.map((s, i) => (
            <li key={s.title}>
              <span className="fx-steps__num">{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Zone() {
  return (
    <section id="zona" className="fx-section">
      <div className="container fx-zone">
        <div>
          <p className="fx-kicker">Vamos a tu casa</p>
          <h2 className="fx-title">Dónde trabajamos</h2>
          <p>Castellón capital y los pueblos de alrededor. ¿No ves el tuyo? Llámanos y te decimos.</p>
        </div>
        <ul className="fx-towns">
          {towns.map((t) => <li key={t}>{t}</li>)}
        </ul>
      </div>
    </section>
  );
}

const emptyForm = { name: '', phone: '', topic: callbackTopics[0], privacy: false };

function Contact() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [sentTo, setSentTo] = useState('');

  const update = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const submit = (e) => {
    e.preventDefault();
    const found = {};
    if (!form.name.trim()) found.name = 'Dinos tu nombre.';
    if (!/^\+?[\d\s-]{9,}$/.test(form.phone.trim())) found.phone = 'Revisa el teléfono, parece incompleto.';
    if (!form.privacy) found.privacy = 'Necesitamos que aceptes la política de privacidad.';
    setErrors(found);
    if (Object.keys(found).length) return;
    // Para un cliente real: enviar con Formspree, EmailJS o similar.
    setSentTo(form.name.trim());
    setForm(emptyForm);
  };

  return (
    <section id="contacto" className="fx-section fx-section--call">
      <div className="container fx-contact">
        <div>
          <h2 className="fx-title">¿Lo arreglamos hoy?</h2>
          <p className="fx-contact__lead">Llámanos y te decimos al momento cuándo podemos ir y cuánto te va a costar.</p>
          <a className="fx-contact__phone" href={telLink(company.phone)}><Phone width={34} height={34} /> {company.phone}</a>
        </div>

        <form className="fx-form" onSubmit={submit} noValidate>
          {sentTo ? (
            <div className="fx-form__done" role="status">
              <Check width={36} height={36} />
              <p><strong>¡Recibido, {sentTo}!</strong> Te llamamos en menos de una hora.</p>
              <p className="fx-form__demo">Web de ejemplo: el formulario no se envía.</p>
              <button type="button" className="fx-link" onClick={() => setSentTo('')}>Enviar otra consulta</button>
            </div>
          ) : (
            <>
              <h3>¿Prefieres que te llamemos?</h3>
              <Field label="Tu nombre" name="name" value={form.name} onChange={update} error={errors.name} autoComplete="name" />
              <Field label="Tu teléfono" name="phone" type="tel" inputMode="tel" value={form.phone} onChange={update} error={errors.phone} autoComplete="tel" />
              <Field label="¿Qué necesitas?" name="topic" as="select" value={form.topic} onChange={update}>
                {callbackTopics.map((t) => <option key={t}>{t}</option>)}
              </Field>
              <PrivacyConsent checked={form.privacy} onChange={update} error={errors.privacy} />
              <button type="submit" className="fx-btn fx-btn--dark fx-btn--block">Que me llamen</button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
