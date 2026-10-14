import PageBanner from '../../../components/PageBanner.jsx';
import AboutSection from '../../../components/AboutSection.jsx';
import Photo from '../../../components/Photo.jsx';
import Reveal from '../../../components/Reveal.jsx';
import ServicesSection from '../components/ServicesSection.jsx';
import { about, company, images } from '../config.js';

const stats = [
  { value: new Date().getFullYear() - company.founded + '+', label: 'Years of experience' },
  { value: '500+', label: 'Projects completed' },
  { value: '24/7', label: 'Emergency service' },
];

export default function About() {
  return (
    <>
      <PageBanner eyebrow="Who we are" title="About us" />
      <AboutSection about={about} media={<Photo src={images.about.src} alt={images.about.alt} className="about__photo" />} />
      <section className="section">
        <div className="container stats">
          {stats.map((s, i) => (
            <Reveal key={s.label} className="stat" delay={i * 150}>
              <span className="stat__value">{s.value}</span>
              <span className="stat__label">{s.label}</span>
            </Reveal>
          ))}
        </div>
      </section>
      <ServicesSection />
    </>
  );
}
