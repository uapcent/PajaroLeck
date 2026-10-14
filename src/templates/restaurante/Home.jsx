import { useMemo, useState } from 'react';
import Field from '../../components/Field.jsx';
import Photo from '../../components/Photo.jsx';
import PrivacyConsent from '../../components/PrivacyConsent.jsx';
import { Check, Clock, MapPin, Minus, Phone, Plus, WhatsApp } from '../../components/Icons.jsx';
import { directionsLink, telLink, whatsappLink } from '../../lib/site.js';
import { addDays, capitalize, formatDate, toISODate, weekdayNames } from '../../lib/dates.js';
import { price } from '../../lib/format.js';
import { hoursRows, openStatus } from '../../lib/hours.js';
import useInView from '../../lib/useInView.js';
import { allergens, company, dailyDishes, dailyMenu, hero, hours, images, location, menu, menuFilters, reservation } from './config.js';
import { reservationDays, reservationTimes } from './slots.js';

export default function Home() {
  // The floating bar hides while the reservation section is on screen ("docks" into it).
  const [reserveRef, reserveInView] = useInView({ threshold: 0.15 });
  const [opened, setOpened] = useState(false);
  if (reserveInView && !opened) setOpened(true);

  return (
    <>
      <Hero />
      <Menu />
      <Gallery />
      <Reserve sectionRef={reserveRef} open={opened} />
      <Visit />
      <ReserveBar hidden={reserveInView} />
    </>
  );
}

function Hero() {
  const today = new Date().getDay();
  const dish = dailyDishes[today];
  const week = [1, 2, 3, 4, 5, 6, 0];
  return (
    <section className="rs-hero">
      <div className="rs-hero__photo">
        <Photo src={images.hero.src} alt={images.hero.alt} className="rs-hero__img" loading="eager" />
      </div>
      <div className="container rs-hero__grid">
        <div className="rs-hero__text">
          <h1>{hero.title}</h1>
          <p>{hero.text}</p>
        </div>

        <article id="hoy" className="rs-board" aria-label="Plato del día">
          <p className="rs-board__day">Hoy, {weekdayNames[today]}</p>
          {dish ? (
            <>
              <p className="rs-board__label">Plato del día</p>
              <h2 className="rs-board__dish">{dish.name}</h2>
              <p className="rs-board__desc">{dish.text}</p>
            </>
          ) : (
            <h2 className="rs-board__dish">Hoy descansamos.<br />¡Te esperamos mañana!</h2>
          )}
          <p className="rs-board__menu">
            <strong>Menú del día · {price(dailyMenu.price)}</strong>
            <span>{dailyMenu.includes}. {dailyMenu.when}.</span>
          </p>
          <details className="rs-board__week">
            <summary>Ver los platos de toda la semana</summary>
            <ul>
              {week.map((d) => (
                <li key={d} className={d === today ? 'is-today' : ''}>
                  <span>{capitalize(weekdayNames[d])}</span>
                  <span>{dailyDishes[d]?.name ?? 'Cerrado'}</span>
                </li>
              ))}
            </ul>
          </details>
        </article>
      </div>
    </section>
  );
}

function Menu() {
  const [active, setActive] = useState([]);
  const toggle = (id) => setActive((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]));
  const tests = menuFilters.filter(([id]) => active.includes(id)).map(([, , test]) => test);
  const matches = (item) => tests.every((test) => test(item));

  return (
    <section id="carta" className="rs-section rs-menu">
      <div className="container">
        <header className="rs-menu__head">
          <p className="rs-script">Para comer y para compartir</p>
          <h2 className="rs-title">La carta</h2>
          <div className="rs-filters" role="group" aria-label="Filtrar la carta">
            {menuFilters.map(([id, label]) => (
              <button key={id} type="button" className={`rs-chip ${active.includes(id) ? 'is-active' : ''}`} aria-pressed={active.includes(id)} onClick={() => toggle(id)}>
                {active.includes(id) && <Check width={16} height={16} />} {label}
              </button>
            ))}
          </div>
        </header>

        <div className="rs-menu__cols">
          {menu.map((cat) => {
            const items = cat.items.filter(matches);
            return (
              <div key={cat.id} className="rs-menu__cat">
                <h3>{cat.title}</h3>
                {cat.intro && <p className="rs-menu__intro">{cat.intro}</p>}
                {items.length === 0 && <p className="rs-menu__intro">No hay platos con estos filtros.</p>}
                <ul>
                  {items.map((item) => (
                    <li key={item.name} className="rs-dish">
                      <div className="rs-dish__line">
                        <span className="rs-dish__name">{item.name}</span>
                        <span className="rs-dish__dots" aria-hidden="true" />
                        <span className="rs-dish__price">{price(item.price)}</span>
                      </div>
                      {item.note && <p className="rs-dish__note">{item.note}</p>}
                      <p className="rs-dish__allergens">
                        {item.veg && <span className="rs-veg">{capitalize(item.veg)}</span>}
                        {item.allergens.length ? `Alérgenos: ${item.allergens.map((a) => allergens[a].toLowerCase()).join(', ')}` : 'Sin alérgenos declarados'}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        <p className="rs-menu__foot">¿Tienes alguna alergia o intolerancia? Díselo a nuestro equipo y te explicamos cada plato. IVA incluido.</p>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <div className="rs-gallery" aria-label="Fotos del restaurante">
      {images.gallery.map((img) => (
        <Photo key={img.src} src={img.src} alt={img.alt} className="rs-gallery__img" />
      ))}
    </div>
  );
}

function ReserveBar({ hidden }) {
  const status = openStatus(hours);
  return (
    <div className={`rs-bar ${hidden ? 'is-hidden' : ''}`} aria-hidden={hidden}>
      <div className="container rs-bar__inner">
        <span className={`rs-bar__status ${status.open ? 'is-open' : ''}`}>
          <span className="rs-bar__dot" aria-hidden="true" />
          {status.text}
        </span>
        <a href="#reservar" className="rs-btn rs-btn--light" tabIndex={hidden ? -1 : undefined}>Reservar mesa</a>
      </div>
    </div>
  );
}

const emptyForm = { name: '', phone: '', notes: '', privacy: false };

function Reserve({ sectionRef, open }) {
  const days = useMemo(() => reservationDays().map(toISODate), []);
  const [date, setDate] = useState(days[0]);
  const [time, setTime] = useState(null);
  const [people, setPeople] = useState(2);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(null);

  const services = useMemo(() => (date ? reservationTimes(date) : []), [date]);
  const status = openStatus(hours);
  const todayISO = toISODate(new Date());
  const tomorrowISO = toISODate(addDays(new Date(), 1));
  const dayLabel = (d) => (d === todayISO ? 'Hoy' : d === tomorrowISO ? 'Mañana' : formatDate(d, { weekday: 'short', day: 'numeric' }));

  const update = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const submit = (e) => {
    e.preventDefault();
    const found = {};
    if (!time) found.time = 'Elige a qué hora venís.';
    if (!form.name.trim()) found.name = 'Dinos a nombre de quién.';
    if (!/^\+?[\d\s-]{9,}$/.test(form.phone.trim())) found.phone = 'Revisa el teléfono, parece incompleto.';
    if (!form.privacy) found.privacy = 'Necesitamos que aceptes la política de privacidad.';
    setErrors(found);
    if (Object.keys(found).length) return;

    const when = `${formatDate(date)} a las ${time}`;
    const text = [
      `¡Hola! Quiero reservar mesa en ${company.name}:`,
      `• ${capitalize(when)}`,
      `• ${people} ${people === 1 ? 'persona' : 'personas'}`,
      `• A nombre de ${form.name.trim()} (${form.phone.trim()})`,
      form.notes.trim() && `• ${form.notes.trim()}`,
    ].filter(Boolean).join('\n');
    window.open(whatsappLink(company.whatsapp, text), '_blank', 'noopener');
    setSent({ when, people, name: form.name.trim() });
  };

  return (
    <section id="reservar" ref={sectionRef} className={`rs-reserve ${open ? 'is-open' : ''}`}>
      <div className="container">
        {/* Same look as the floating bar: it "lands" here and opens up into the form */}
        <div className="rs-reserve__bar">
          <span className={`rs-bar__status ${status.open ? 'is-open' : ''}`}>
            <span className="rs-bar__dot" aria-hidden="true" />
            {status.text}
          </span>
          <h2>Reservar mesa</h2>
        </div>

        <div className="rs-reserve__body">
          {sent ? (
            <div className="rs-reserve__done" role="status">
              <Check width={40} height={40} />
              <h3>¡Casi está, {sent.name}!</h3>
              <p>Te hemos abierto WhatsApp con tu reserva para el <strong>{sent.when}</strong> ({sent.people} {sent.people === 1 ? 'persona' : 'personas'}). Solo tienes que pulsar <strong>Enviar</strong>.</p>
              <p>Te confirmamos enseguida. ¿No se ha abierto WhatsApp? Llámanos al <a href={telLink(company.phone)}>{company.phone}</a>.</p>
              <button type="button" className="rs-link" onClick={() => { setSent(null); setForm(emptyForm); setTime(null); }}>Hacer otra reserva</button>
            </div>
          ) : (
            <form className="rs-form" onSubmit={submit} noValidate>
              <fieldset className="rs-form__group">
                <legend>¿Qué día?</legend>
                <div className="rs-pills">
                  {days.slice(0, 8).map((d) => (
                    <button key={d} type="button" className={`rs-pill ${d === date ? 'is-active' : ''}`} aria-pressed={d === date} onClick={() => { setDate(d); setTime(null); }}>
                      {capitalize(dayLabel(d))}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset className="rs-form__group">
                <legend>¿A qué hora?</legend>
                {services.map(([label, times]) => (
                  <div key={label} className="rs-form__service">
                    <span className="rs-form__service-label"><Clock width={16} height={16} /> {label}</span>
                    <div className="rs-pills">
                      {times.map((t) => (
                        <button key={t} type="button" className={`rs-pill rs-pill--time ${t === time ? 'is-active' : ''}`} aria-pressed={t === time} onClick={() => setTime(t)}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                {errors.time && <span className="field__error">{errors.time}</span>}
              </fieldset>

              <fieldset className="rs-form__group">
                <legend>¿Cuántos sois?</legend>
                <div className="rs-stepper">
                  <button type="button" onClick={() => setPeople((p) => Math.max(1, p - 1))} aria-label="Una persona menos" disabled={people <= 1}><Minus /></button>
                  <output aria-live="polite">{people} {people === 1 ? 'persona' : 'personas'}</output>
                  <button type="button" onClick={() => setPeople((p) => Math.min(reservation.maxPeople, p + 1))} aria-label="Una persona más" disabled={people >= reservation.maxPeople}><Plus /></button>
                </div>
                {people >= reservation.maxPeople && <span className="field__hint">¿Sois más? Llámanos al {company.phone} y lo organizamos.</span>}
              </fieldset>

              <div className="rs-form__row">
                <Field label="A nombre de" name="name" value={form.name} onChange={update} error={errors.name} autoComplete="name" />
                <Field label="Teléfono" name="phone" type="tel" inputMode="tel" value={form.phone} onChange={update} error={errors.phone} autoComplete="tel" />
              </div>
              <Field label="¿Algo que debamos saber? (opcional)" name="notes" value={form.notes} onChange={update} placeholder="Alergias, trona, terraza…" />
              <PrivacyConsent checked={form.privacy} onChange={update} error={errors.privacy} />
              <button type="submit" className="rs-btn rs-btn--wa">
                <WhatsApp width={20} height={20} /> Enviar reserva por WhatsApp
              </button>
              <p className="rs-form__alt">¿Prefieres llamar? <a href={telLink(company.phone)}>{company.phone}</a></p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Visit() {
  const d = 0.004;
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${location.lng - d},${location.lat - d},${location.lng + d},${location.lat + d}&layer=mapnik&marker=${location.lat},${location.lng}`;
  return (
    <section id="donde" className="rs-section rs-visit">
      <div className="container rs-visit__grid">
        <div>
          <p className="rs-script">Te esperamos</p>
          <h2 className="rs-title">Dónde estamos</h2>
          <dl className="rs-hours">
            {hoursRows(hours).map(([days, text]) => (
              <div key={days}><dt>{days}</dt><dd>{text}</dd></div>
            ))}
          </dl>
          <p className="rs-visit__line"><MapPin /> {company.address}</p>
          <p className="rs-visit__line"><Phone /> <a href={telLink(company.phone)}>{company.phone}</a></p>
          <a className="rs-btn rs-btn--outline" href={directionsLink(company.address)} target="_blank" rel="noopener noreferrer">Cómo llegar</a>
        </div>
        <iframe className="rs-visit__map" title={`Mapa: ${company.name}`} src={mapSrc} loading="lazy" />
      </div>
    </section>
  );
}
