import Eyebrow from './Eyebrow.jsx';
import Reveal from './Reveal.jsx';
import Logo from './Logo.jsx';

// about: { eyebrow, title, titleAccent, paragraphs } from the template config.
export default function AboutSection({ about, media }) {
  return (
    <section className="section section--cream">
      <div className="container about">
        <div className="about__text">
          <Eyebrow>{about.eyebrow}</Eyebrow>
          <Reveal as="h2" className="section-title" delay={200}>
            <span className="heading-mark">{about.title}</span> <span className="text-accent">{about.titleAccent}</span>
          </Reveal>
          {about.paragraphs.map((p, i) => (
            <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
          ))}
        </div>
        <div className="about__media">{media ?? <Logo size="xl" />}</div>
      </div>
    </section>
  );
}
