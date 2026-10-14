import { Link } from 'react-router-dom';
import Hero from '../../../components/Hero.jsx';
import AboutSection from '../../../components/AboutSection.jsx';
import Eyebrow from '../../../components/Eyebrow.jsx';
import OpeningHours from '../../../components/OpeningHours.jsx';
import Photo from '../../../components/Photo.jsx';
import Reveal from '../../../components/Reveal.jsx';
import { Clock, MapPin, Phone } from '../../../components/Icons.jsx';
import site, { about, company, images, openingHours, services } from '../config.js';
import { price } from '../format.js';

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection about={about} media={<Photo src={images.about.src} alt={images.about.alt} className="about__photo" />} />

      <section id="prices" className="section">
        <div className="container">
          <Eyebrow center>Services</Eyebrow>
          <Reveal as="h2" className="section-title section-title--center" delay={200}>
            <span className="heading-mark">Prices</span>
          </Reveal>
          <ul className="price-list">
            {services.map((s, i) => (
              <Reveal as="li" key={s.id} className="price-item" delay={(i % 2) * 120}>
                <div>
                  <h3>{s.name}</h3>
                  <p>{s.description}</p>
                  <span className="price-item__meta"><Clock width={16} height={16} /> {s.duration} min</span>
                </div>
                <div className="price-item__side">
                  <span className="price-item__price">{price(s.price)}</span>
                  <Link to={`${site.base}/book?service=${s.id}`} className="btn btn--primary btn--small">Book</Link>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container visit">
          <div>
            <Eyebrow>Find us</Eyebrow>
            <h2 className="section-title">Opening hours</h2>
            <OpeningHours rows={openingHours} />
          </div>
          <div>
            <ul className="contact__list">
              <li><span className="contact__icon"><MapPin /></span>{company.address}</li>
              <li><span className="contact__icon"><Phone /></span><a href={`tel:${company.phones[0].replace(/\s/g, '')}`}>{company.phones[0]}</a></li>
            </ul>
            <Link to={`${site.base}/book`} className="btn btn--primary visit__cta">Book an appointment</Link>
          </div>
        </div>
      </section>
    </>
  );
}
