import { Link } from 'react-router-dom';
import { company, serviceCards } from '../site.config.js';
import Eyebrow from './Eyebrow.jsx';
import Reveal from './Reveal.jsx';
import { ArrowRight, Bolt } from './Icons.jsx';

export default function ServicesSection() {
  return (
    <section className="section services">
      <svg className="services__lines" viewBox="0 0 1200 400" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 300 C 300 100, 600 500, 1200 120" />
        <path d="M0 340 C 350 140, 650 520, 1200 160" />
        <path d="M0 380 C 400 180, 700 540, 1200 200" />
      </svg>
      <div className="container">
        <div className="services__head">
          <svg className="services__arrow" viewBox="0 0 120 80" aria-hidden="true">
            <path d="M10 75 C 15 30, 50 10, 105 15" />
            <path d="M92 5 L106 15 L92 26" />
          </svg>
          <Bolt className="services__bolt" />
          <Eyebrow center>{company.name}</Eyebrow>
          <Reveal as="h2" className="section-title section-title--center" delay={200}>
            <span className="heading-mark">Our Services</span>
          </Reveal>
        </div>
        <div className="cards">
          {serviceCards.map((card, i) => (
            <Reveal key={card.title} delay={i * 150}>
              <Link
                to={card.to}
                className={`card card--${card.style}`}
                style={card.image ? { backgroundImage: `url(${card.image.src})` } : undefined}
              >
                <span className="card__arrow" aria-hidden="true">
                  <ArrowRight />
                </span>
                <h3 className="card__title">{card.title}</h3>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
