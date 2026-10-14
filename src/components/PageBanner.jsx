import { Link } from 'react-router-dom';
import { useSite } from '../lib/site.js';
import Eyebrow from './Eyebrow.jsx';

// Smaller hero used at the top of inner pages.
export default function PageBanner({ eyebrow, title }) {
  const { images, home } = useSite();
  return (
    <section className="banner" style={{ backgroundImage: `url(${images.pageBanner.src})` }}>
      <div className="hero__overlay" />
      <div className="container banner__content">
        <Eyebrow light>{eyebrow}</Eyebrow>
        <h1 className="banner__title">{title}</h1>
        <p className="banner__crumbs">
          <Link to={home}>Home</Link> / <span>{title}</span>
        </p>
      </div>
    </section>
  );
}
