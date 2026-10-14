import { Link, Outlet } from 'react-router-dom';
import { LegalLinks } from '../../pages/Legal.jsx';
import { telLink } from '../../lib/site.js';
import { Phone } from '../../components/Icons.jsx';
import site, { company } from './config.js';

const left = [['#hoy', 'Hoy'], ['#carta', 'Carta']];
const right = [['#reservar', 'Reservar'], ['#donde', 'Dónde estamos']];
const NavLinks = ({ items }) => items.map(([href, label]) => <Link key={href} to={`${site.base}/${href}`}>{label}</Link>);

export default function Layout() {
  return (
    <>
      <header className="rs-header">
        <div className="container rs-header__inner">
          <nav className="rs-header__nav" aria-label="Secciones"><NavLinks items={left} /></nav>
          <Link to={site.home} className="rs-logo" aria-label={`${company.name}, inicio`}>
            <span className="rs-logo__name">{company.name}</span>
            <span className="rs-logo__tag">{company.tagline} · desde {company.since}</span>
          </Link>
          <nav className="rs-header__nav rs-header__nav--right" aria-label="Más secciones"><NavLinks items={right} /></nav>
          <a className="rs-header__phone" href={telLink(company.phone)} aria-label={`Llamar al ${company.phone}`}><Phone /></a>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="rs-footer">
        <div className="container rs-footer__inner">
          <p className="rs-footer__name">{company.name}</p>
          <p>{company.address} · <a href={telLink(company.phone)}>{company.phone}</a></p>
          <p className="rs-footer__legal">
            <span>© {new Date().getFullYear()} {company.legalName}</span>
            <LegalLinks />
          </p>
        </div>
      </footer>
    </>
  );
}
