import { useState } from 'react';
import Photo from '../../components/Photo.jsx';
import { ArrowRight, Instagram, Phone, Star, WhatsApp } from '../../components/Icons.jsx';
import { directionsLink, telLink, whatsappLink } from '../../lib/site.js';
import { price } from '../../lib/format.js';
import { hoursRows, openStatus } from '../../lib/hours.js';
import { company, hours, instagram, rating, reviews, services, since, stylists } from '../peluqueria/config.js';
import { byCategory } from '../peluqueria/slots.js';
import { images, stats } from './config.js';
import { useOpenWizard } from './Wizard.jsx';

export default function Home() {
  const openWizard = useOpenWizard();
  const status = openStatus(hours);

  return (
    <>
      <section className="es-hero">
        <div className="container">
          <p className="es-hero__top">
            <span>Peluquería &amp; barbería</span>
            <span className={`es-chip ${status.open ? 'is-open' : ''}`}>{status.text}</span>
            <span>Castellón · desde {since}</span>
          </p>
          <h1 className="es-hero__title">{company.name}</h1>
          <div className="es-hero__photos">
            {images.hero.map((img, i) => (
              <Photo key={img.src} src={img.src} alt={img.alt} className={`es-hero__img es-hero__img--${i + 1}`} loading="eager" />
            ))}
            <button type="button" className="es-sticker" onClick={() => openWizard()} aria-label="Reservar cita online">
              <svg className="es-sticker__ring" viewBox="0 0 200 200" aria-hidden="true">
                <defs><path id="es-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" /></defs>
                <text><textPath href="#es-circle">Reserva online ✦ 24 horas ✦ sin llamar ✦</textPath></text>
              </svg>
              <ArrowRight width={40} height={40} className="es-sticker__arrow" />
            </button>
          </div>
          <div className="es-hero__bottom">
            <p>Cortes con actitud. Color sin miedo.<br />Reserva en 30 segundos, a cualquier hora.</p>
            <button type="button" className="es-btn es-btn--lime es-btn--big" onClick={() => openWizard()}>Reserva tu cita <ArrowRight /></button>
          </div>
        </div>
      </section>

      <div className="es-marquee" aria-hidden="true">
        <div className="es-marquee__track">
          {[0, 1].map((copy) => (
            <span key={copy}>
              {services.map((s) => <span key={s.id}>{s.name} {price(s.price)} <b>✦</b> </span>)}
            </span>
          ))}
        </div>
      </div>

      <Menu />

      <section className="es-stats" aria-label="En cifras">
        <div className="container es-stats__grid">
          <div><strong>{rating.score.toLocaleString('es-ES')}<Star width={34} height={34} /></strong><span>{rating.count} opiniones en Google</span></div>
          {stats.map(([n, label]) => <div key={label}><strong>{n}</strong><span>{label}</span></div>)}
        </div>
      </section>

      <section id="crew" className="es-section">
        <div className="container">
          <header className="es-head">
            <h2 className="es-title">La crew</h2>
            <p>Tres estilos, un mismo sillón. Elige con quién o deja que te toque quien esté libre.</p>
          </header>
          <div className="es-crew">
            {stylists.map((s) => (
              <article key={s.id} className="es-member">
                <div className="es-member__photo">
                  <Photo src={images.crew[s.id]?.src} alt={images.crew[s.id]?.alt ?? s.name} className="es-member__img" />
                  <span className="es-member__role">{s.role}</span>
                </div>
                <h3>{s.name}</h3>
                <p>{s.bio}</p>
                <button type="button" className="es-link" onClick={() => openWizard({ who: s.id })}>Reserva con {s.name} <ArrowRight width={16} height={16} /></button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="es-section es-reviews" aria-labelledby="es-reviews-title">
        <div className="container">
          <header className="es-head">
            <h2 id="es-reviews-title" className="es-title">Lo que dicen</h2>
            <p>Opiniones de ejemplo para la demostración.</p>
          </header>
        </div>
        <div className="es-reviews__track">
          {reviews.map((r) => (
            <figure key={r.name} className="es-review">
              <span className="es-review__stars" aria-label="5 de 5 estrellas">{[1, 2, 3, 4, 5].map((n) => <Star key={n} />)}</span>
              <blockquote>{r.text}</blockquote>
              <figcaption><strong>{r.name}</strong> · {r.when}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="feed" className="es-section">
        <div className="container">
          <header className="es-head es-head--row">
            <h2 className="es-title">{instagram}</h2>
            <a className="es-btn es-btn--ghost" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><Instagram /> Síguenos</a>
          </header>
          <div className="es-feed">
            {images.feed.map((img) => (
              <figure key={img.src} className="es-feed__item">
                <Photo src={img.src} alt={img.alt} className="es-feed__img" />
                <figcaption>{img.alt}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="visitanos" className="es-section es-visit">
        <div className="container es-visit__grid">
          <div>
            <h2 className="es-title">Estamos en</h2>
            <p className="es-visit__address">{company.address}</p>
            <div className="es-visit__actions">
              <a className="es-btn es-btn--lime" href={directionsLink(company.address)} target="_blank" rel="noopener noreferrer">Cómo llegar <ArrowRight /></a>
              <a className="es-btn es-btn--ghost" href={telLink(company.phone)}><Phone width={18} height={18} /> {company.phone}</a>
              <a className="es-btn es-btn--ghost" href={whatsappLink(company.whatsapp)} target="_blank" rel="noopener noreferrer"><WhatsApp width={18} height={18} /> WhatsApp</a>
            </div>
          </div>
          <dl className="es-hours">
            {hoursRows(hours).map(([days, text]) => (
              <div key={days} className={text === 'Cerrado' ? 'is-closed' : ''}><dt>{days}</dt><dd>{text}</dd></div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}

// Service cards with a category filter. Clicking a card opens the booking with it chosen.
function Menu() {
  const openWizard = useOpenWizard();
  const groups = byCategory(services);
  const [filter, setFilter] = useState('Todo');
  const shown = filter === 'Todo' ? services : groups.find(([c]) => c === filter)[1];

  return (
    <section id="menu" className="es-section">
      <div className="container">
        <header className="es-head es-head--row">
          <h2 className="es-title">El menú</h2>
          <div className="es-filters" role="group" aria-label="Filtrar servicios">
            {['Todo', ...groups.map(([c]) => c)].map((c) => (
              <button key={c} type="button" aria-pressed={filter === c} onClick={() => setFilter(c)}>{c}</button>
            ))}
          </div>
        </header>
        <div className="es-cards">
          {shown.map((s) => (
            <button key={s.id} type="button" className="es-card" onClick={() => openWizard({ serviceId: s.id })}>
              <span className="es-card__num">{String(services.indexOf(s) + 1).padStart(2, '0')}</span>
              <span className="es-card__name">{s.name}</span>
              <span className="es-card__detail">{s.detail ?? s.category}</span>
              <span className="es-card__foot">
                <span>{s.duration} min</span>
                <span className="es-card__price">{price(s.price)}</span>
              </span>
              <span className="es-card__cta">Reservar <ArrowRight width={16} height={16} /></span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
