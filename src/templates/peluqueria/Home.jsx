import Photo from '../../components/Photo.jsx';
import { Clock, MapPin, Phone } from '../../components/Icons.jsx';
import { directionsLink, telLink } from '../../lib/site.js';
import { price } from '../../lib/format.js';
import { hoursRows, openStatus } from '../../lib/hours.js';
import { about, company, hours, images, services } from './config.js';
import Booking from './Booking.jsx';

export default function Home() {
  const status = openStatus(hours);
  return (
    <>
      <section className="pq-banner">
        <Photo src={images.banner.src} alt={images.banner.alt} className="pq-banner__img" loading="eager" />
        <div className="container pq-banner__text">
          <h1>Pide tu cita</h1>
          <p>
            <span className={`pq-status ${status.open ? 'is-open' : ''}`}>{status.text}</span>
          </p>
        </div>
      </section>

      <section id="cita" className="pq-booking" aria-label="Pedir cita">
        <div className="container pq-booking__inner">
          <Booking />
        </div>
      </section>

      <section className="pq-section">
        <div className="container pq-info">
          <div className="pq-panel">
            <h2><Clock width={22} height={22} /> Horario</h2>
            <dl className="pq-hours">
              {hoursRows(hours).map(([days, text]) => (
                <div key={days}><dt>{days}</dt><dd>{text}</dd></div>
              ))}
            </dl>
          </div>
          <div className="pq-panel">
            <h2><MapPin width={22} height={22} /> Dónde estamos</h2>
            <p>{company.address}</p>
            <div className="pq-panel__actions">
              <a className="pq-btn pq-btn--ghost" href={directionsLink(company.address)} target="_blank" rel="noopener noreferrer">Cómo llegar</a>
              <a className="pq-btn pq-btn--ghost" href={telLink(company.phone)}><Phone width={18} height={18} /> Llamar</a>
            </div>
          </div>
        </div>
      </section>

      <section id="precios" className="pq-section pq-section--photo">
        <div className="pq-section__bg" aria-hidden="true">
          <Photo src={images.prices.src} alt="" className="pq-section__bg-img" />
        </div>
        <div className="container pq-prices">
          <h2 className="pq-title">Precios</h2>
          <ul>
            {services.map((s) => (
              <li key={s.id}>
                <span className="pq-prices__name">{s.name}<small>{s.duration} min</small></span>
                <strong>{price(s.price)}</strong>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="pq-section pq-about">
        <div className="container">
          <h2 className="pq-title">Quiénes somos</h2>
          <p>{about}</p>
          <div className="pq-team">
            {images.team.map((img) => (
              <Photo key={img.src} src={img.src} alt={img.alt} className="pq-team__img" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
