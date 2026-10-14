import { Link } from 'react-router-dom';
import Hero from '../../../components/Hero.jsx';
import AboutSection from '../../../components/AboutSection.jsx';
import Eyebrow from '../../../components/Eyebrow.jsx';
import OpeningHours from '../../../components/OpeningHours.jsx';
import Photo from '../../../components/Photo.jsx';
import Reveal from '../../../components/Reveal.jsx';
import { ArrowRight, MapPin, Phone } from '../../../components/Icons.jsx';
import site, { about, company, images, location, menu, openingHours } from '../config.js';
import { price } from '../format.js';

const featured = menu.flatMap((c) => c.items).filter((i) => i.featured);
const d = 0.004; // map zoom: bounding-box half-size in degrees
const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${location.lng - d},${location.lat - d},${location.lng + d},${location.lat + d}&layer=mapnik&marker=${location.lat},${location.lng}`;

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection about={about} media={<Photo src={images.about.src} alt={images.about.alt} className="about__photo" />} />

      <section className="section">
        <div className="container">
          <Eyebrow center>From the kitchen</Eyebrow>
          <Reveal as="h2" className="section-title section-title--center" delay={200}>
            <span className="heading-mark">Signature dishes</span>
          </Reveal>
          <div className="dishes">
            {featured.map((dish, i) => (
              <Reveal key={dish.name} className="dish" delay={i * 150}>
                <Photo src={dish.image} alt={dish.name} className="dish__photo" />
                <div className="dish__body">
                  <h3>{dish.name}</h3>
                  <p>{dish.description}</p>
                  <span className="dish__price">{price(dish.price)}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="center">
            <Link to={`${site.base}/menu`} className="btn btn--primary">
              Full menu <ArrowRight width={16} height={16} />
            </Link>
          </p>
        </div>
      </section>

      <section id="visit" className="section section--cream">
        <div className="container visit">
          <div>
            <Eyebrow>Visit us</Eyebrow>
            <h2 className="section-title">Opening hours</h2>
            <OpeningHours rows={openingHours} />
            <ul className="contact__list">
              <li><span className="contact__icon"><MapPin /></span>{company.address}</li>
              <li><span className="contact__icon"><Phone /></span><a href={`tel:${company.phones[0].replace(/\s/g, '')}`}>{company.phones[0]}</a></li>
            </ul>
            <Link to={`${site.base}/reserve`} className="btn btn--primary visit__cta">Book a table</Link>
          </div>
          <iframe className="visit__map" title={`Map showing ${company.name}`} src={mapSrc} loading="lazy" />
        </div>
      </section>
    </>
  );
}
