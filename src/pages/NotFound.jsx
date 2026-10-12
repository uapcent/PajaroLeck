import { Link } from 'react-router-dom';
import PageBanner from '../components/PageBanner.jsx';

export default function NotFound() {
  return (
    <>
      <PageBanner eyebrow="Error 404" title="Page not found" />
      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <p>The page you are looking for has flown away.</p>
          <Link to="/" className="btn btn--primary">Back to home</Link>
        </div>
      </section>
    </>
  );
}
