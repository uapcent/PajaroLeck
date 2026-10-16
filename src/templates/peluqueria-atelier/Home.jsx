import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Photo from '../../components/Photo.jsx';
import { ArrowLeft, ArrowRight, Close, Phone, Star } from '../../components/Icons.jsx';
import { directionsLink, telLink } from '../../lib/site.js';
import { price } from '../../lib/format.js';
import { hoursRows, openStatus } from '../../lib/hours.js';
import { about, company, hours, rating, reviews, services, since, stylists } from '../peluqueria/config.js';
import { byCategory } from '../peluqueria/slots.js';
import site, { images, intro, promises } from './config.js';
import { useOpenBooking } from './BookingDrawer.jsx';

export default function Home() {
  const openBooking = useOpenBooking();
  const status = openStatus(hours);

  return (
    <>
      <section className="at-hero">
        <div className="container at-hero__grid">
          <div className="at-hero__text">
            <p className="at-eyebrow">Peluquería en Castellón · desde {since}</p>
            <h1>Tu pelo,<br /><em>sin prisas.</em></h1>
            <p className="at-hero__lead">Cortes, color y peinados con tiempo para escucharte. Reserva en un minuto, a cualquier hora.</p>
            <div className="at-hero__actions">
              <button type="button" className="at-btn at-btn--solid" onClick={() => openBooking()}>Reservar cita</button>
              <Link to={`${site.base}/#servicios`} className="at-link">Ver servicios y precios</Link>
            </div>
            <p className={`at-status ${status.open ? 'is-open' : ''}`}>{status.text}</p>
          </div>
          <figure className="at-hero__figure">
            <Photo src={images.hero.src} alt={images.hero.alt} className="at-hero__img" loading="eager" />
            <figcaption>Balayage · Lucía</figcaption>
          </figure>
        </div>
      </section>

      <ul className="at-promises" aria-label="Lo que nos importa">
        {promises.map((p) => <li key={p}>{p}</li>)}
      </ul>

      <section className="at-section at-intro">
        <div className="container at-intro__grid">
          <div className="at-intro__photos">
            <Photo src={images.intro[0].src} alt={images.intro[0].alt} className="at-intro__img at-intro__img--big" />
            <Photo src={images.intro[1].src} alt={images.intro[1].alt} className="at-intro__img at-intro__img--small" />
          </div>
          <div className="at-intro__text">
            <p className="at-eyebrow">Nosotros</p>
            <h2 className="at-title">{intro.title}</h2>
            <p className="at-lead">{intro.text}</p>
            <p>{about}</p>
            <Link to={`${site.base}/#equipo`} className="at-link">Conoce al equipo</Link>
          </div>
        </div>
      </section>

      <section id="servicios" className="at-section at-services">
        <div className="container at-services__grid">
          <div className="at-services__side">
            <p className="at-eyebrow">La carta</p>
            <h2 className="at-title">Servicios <em>y precios</em></h2>
            <p>Todos los precios incluyen lavado. Si no sabes qué pedir, reserva un corte y lo hablamos en el sillón.</p>
            <Photo src={images.services.src} alt={images.services.alt} className="at-services__img" />
          </div>
          <div className="at-menu-list">
            {byCategory(services).map(([category, list], i) => (
              <details key={category} open={i === 0}>
                <summary><span>{category}</span><small>{list.length} {list.length === 1 ? 'servicio' : 'servicios'}</small></summary>
                <ul>
                  {list.map((s) => (
                    <li key={s.id}>
                      <div className="at-menu-list__line">
                        <strong>{s.name}</strong>
                        <span className="at-menu-list__dots" aria-hidden="true" />
                        <strong>{price(s.price)}</strong>
                      </div>
                      <div className="at-menu-list__meta">
                        <span>{s.detail ? `${s.detail} · ` : ''}{s.duration} min</span>
                        <button type="button" className="at-link" onClick={() => openBooking({ serviceId: s.id })}>Reservar</button>
                      </div>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="equipo" className="at-section at-team">
        <div className="container">
          <header className="at-section__head">
            <p className="at-eyebrow">El equipo</p>
            <h2 className="at-title">Las manos <em>detrás</em></h2>
          </header>
          <div className="at-team__grid">
            {stylists.map((s) => (
              <article key={s.id} className="at-person">
                <Photo src={images.team[s.id]?.src} alt={images.team[s.id]?.alt ?? s.name} className="at-person__img" />
                <h3>{s.name}</h3>
                <p className="at-person__role">{s.role}</p>
                <p>{s.bio}</p>
                <button type="button" className="at-link" onClick={() => openBooking({ who: s.id })}>Reservar con {s.name}</button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Gallery />

      <Quotes />

      <section id="visitanos" className="at-section at-visit">
        <div className="container at-visit__grid">
          <Photo src={images.visit.src} alt={images.visit.alt} className="at-visit__img" />
          <div className="at-visit__text">
            <p className="at-eyebrow">Visítanos</p>
            <h2 className="at-title">Te esperamos <em>en el centro</em></h2>
            <p className="at-lead">{company.address}</p>
            <dl className="at-hours">
              {hoursRows(hours).map(([days, text]) => (
                <div key={days}><dt>{days}</dt><dd>{text}</dd></div>
              ))}
            </dl>
            <div className="at-visit__actions">
              <button type="button" className="at-btn at-btn--solid" onClick={() => openBooking()}>Reservar cita</button>
              <a className="at-btn at-btn--line" href={directionsLink(company.address)} target="_blank" rel="noopener noreferrer">Cómo llegar</a>
              <a className="at-btn at-btn--line" href={telLink(company.phone)}><Phone width={16} height={16} /> {company.phone}</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// One review at a time, picked with the dots.
function Quotes() {
  const [i, setI] = useState(0);
  const r = reviews[i];
  return (
    <section className="at-section at-quotes" aria-label="Opiniones">
      <div className="container">
        <p className="at-eyebrow">{rating.score.toLocaleString('es-ES')} <Star width={14} height={14} /> · {rating.count} opiniones en Google</p>
        <blockquote key={i}>
          <p>“{r.text}”</p>
          <footer>{r.name} · {r.when}</footer>
        </blockquote>
        <div className="at-quotes__dots" role="group" aria-label="Elegir opinión">
          {reviews.map((rv, n) => (
            <button key={rv.name} type="button" aria-label={`Opinión de ${rv.name}`} aria-pressed={n === i} onClick={() => setI(n)} />
          ))}
        </div>
        <p className="at-quiet at-quiet--small">Opiniones de ejemplo para la demostración.</p>
      </div>
    </section>
  );
}

// Masonry of recent work; clicking a photo opens it large.
function Gallery() {
  const [open, setOpen] = useState(null); // index of the photo shown large
  const ref = useRef(null);
  const list = images.gallery;
  const move = (step) => setOpen((n) => (n + step + list.length) % list.length);

  useEffect(() => {
    const dialog = ref.current;
    if (open !== null && !dialog.open) dialog.showModal();
    if (open === null && dialog.open) dialog.close();
  }, [open]);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') move(1);
    if (e.key === 'ArrowLeft') move(-1);
  };

  return (
    <section id="trabajos" className="at-section at-gallery">
      <div className="container">
        <header className="at-section__head">
          <p className="at-eyebrow">Trabajos recientes</p>
          <h2 className="at-title">Del salón <em>a la calle</em></h2>
        </header>
        <div className="at-gallery__grid">
          {list.map((img, n) => (
            <button key={img.src} type="button" className="at-gallery__item" onClick={() => setOpen(n)} aria-label={`Ampliar: ${img.alt}`}>
              <Photo src={img.src} alt={img.alt} className="at-gallery__img" />
            </button>
          ))}
        </div>
      </div>
      <dialog ref={ref} className="at-lightbox" onClose={() => setOpen(null)} onKeyDown={onKeyDown} onClick={(e) => e.target === ref.current && setOpen(null)} aria-label="Foto ampliada">
        {open !== null && (
          <figure>
            <Photo src={list[open].src.replace('w=800', 'w=1600')} alt={list[open].alt} className="at-lightbox__img" />
            <figcaption>{list[open].alt} <span>{open + 1} / {list.length}</span></figcaption>
          </figure>
        )}
        <button type="button" className="at-lightbox__btn at-lightbox__btn--prev" onClick={() => move(-1)} aria-label="Anterior"><ArrowLeft /></button>
        <button type="button" className="at-lightbox__btn at-lightbox__btn--next" onClick={() => move(1)} aria-label="Siguiente"><ArrowRight /></button>
        <button type="button" className="at-lightbox__btn at-lightbox__btn--close" onClick={() => setOpen(null)} aria-label="Cerrar"><Close /></button>
      </dialog>
    </section>
  );
}
