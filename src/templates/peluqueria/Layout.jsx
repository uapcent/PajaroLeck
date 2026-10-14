import { Link, Outlet } from 'react-router-dom';
import { LegalLinks } from '../../pages/Legal.jsx';
import { telLink } from '../../lib/site.js';
import { Phone } from '../../components/Icons.jsx';
import site, { company } from './config.js';

export default function Layout() {
  return (
    <>
      <header className="pq-header">
        <div className="container pq-header__inner">
          <Link to={site.home} className="pq-logo" aria-label={`${company.name}, inicio`}>
            {company.name.toLowerCase()}<span>.</span>
          </Link>
          <a className="pq-header__phone" href={telLink(company.phone)}>
            <Phone width={18} height={18} /> <span>{company.phone}</span>
          </a>
          <Link to={`${site.base}/#cita`} className="pq-btn pq-btn--primary pq-header__cta">Pedir cita</Link>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="pq-footer">
        <div className="container pq-footer__inner">
          <span className="pq-logo pq-logo--small">{company.name.toLowerCase()}<span>.</span></span>
          <p>{company.address} · <a href={telLink(company.phone)}>{company.phone}</a></p>
          <p className="pq-footer__links">
            <LegalLinks />
            <Link to={`${site.base}/agenda`}>Acceso para el salón</Link>
          </p>
        </div>
      </footer>
    </>
  );
}
