import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { hero, images } from '../site.config.js';
import Eyebrow from './Eyebrow.jsx';
import Reveal from './Reveal.jsx';
import { ArrowRight } from './Icons.jsx';

const SLIDE_MS = 5000;

export default function Hero() {
  const [active, setActive] = useState(0);
  const slides = images.hero;

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), SLIDE_MS);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <section className="hero">
      <div className="hero__slides" aria-hidden="true">
        {slides.map((s, i) => (
          <div
            key={s.src}
            className={`hero__slide ${i === active ? 'is-active' : ''}`}
            style={{ backgroundImage: `url(${s.src})` }}
          />
        ))}
      </div>
      <div className="hero__overlay" />
      <div className="container hero__content">
        <Eyebrow light>{hero.eyebrow}</Eyebrow>
        <Reveal as="h1" className="hero__title" delay={200}>
          <span className="heading-mark">{hero.title}</span>
          <span className="hero__accent">{hero.titleAccent}</span>
        </Reveal>
        <p className="hero__text">{hero.text}</p>
        <Link to={hero.cta.to} className="btn btn--light">
          {hero.cta.label} <ArrowRight width={16} height={16} />
        </Link>
      </div>
    </section>
  );
}
