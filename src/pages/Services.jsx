import { Link } from 'react-router-dom';
import PageBanner from '../components/PageBanner.jsx';
import Eyebrow from '../components/Eyebrow.jsx';
import Photo from '../components/Photo.jsx';
import Reveal from '../components/Reveal.jsx';
import { Check, ArrowRight } from '../components/Icons.jsx';
import { serviceDetails } from '../site.config.js';

export default function Services() {
  return (
    <>
      <PageBanner eyebrow="What we do" title="Services" />
      {serviceDetails.map((s, i) => (
        <section key={s.id} id={s.id} className={`section ${i % 2 ? 'section--cream' : ''}`}>
          <div className={`container detail ${i % 2 ? 'detail--reverse' : ''}`}>
            <Photo src={s.image.src} alt={s.image.alt} className="detail__photo" />
            <div>
              <Eyebrow>{`Service 0${i + 1}`}</Eyebrow>
              <Reveal as="h2" className="section-title">
                {s.title}
              </Reveal>
              <p>{s.text}</p>
              <ul className="checklist">
                {s.points.map((p) => (
                  <li key={p}>
                    <Check /> {p}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="btn btn--primary">
                Request a quote <ArrowRight width={16} height={16} />
              </Link>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
