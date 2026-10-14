import { Link } from 'react-router-dom';
import PageBanner from '../components/PageBanner.jsx';
import { useSite } from '../lib/site.js';

export default function NotFound() {
  const { home } = useSite();
  return (
    <>
      <PageBanner eyebrow="Error 404" title="Page not found" />
      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <p>The page you are looking for has flown away.</p>
          <Link to={home} className="btn btn--primary">Back to home</Link>
        </div>
      </section>
    </>
  );
}
