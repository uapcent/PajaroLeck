import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LegalLinks } from '../../pages/Legal.jsx';
import { directionsLink, telLink } from '../../lib/site.js';
import { hoursRows } from '../../lib/hours.js';
import { Close, Menu } from '../../components/Icons.jsx';
import { company, hours } from '../peluqueria/config.js';
import { agendaPath } from '../peluqueria/variants.js';
import VariantMenu from '../peluqueria/VariantMenu.jsx';
import site from './config.js';
import BookingDrawer, { BookingProvider, useOpenBooking } from './BookingDrawer.jsx';

const sections = [['#servicios', 'Servicios'], ['#equipo', 'Equipo'], ['#trabajos', 'Trabajos'], ['#visitanos', 'Visítanos']];

export default function Layout() {
  return (
    <BookingProvider>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer className="at-footer">
        <div className="container at-footer__grid">
          <div>
            <p className="at-footer__logo">{company.name}</p>
            <p className="at-footer__tag">{company.tagline} · Castellón</p>
          </div>
          <div>
            <h2>Visítanos</h2>
            <p>{company.address}</p>
            <p><a href={telLink(company.phone)}>{company.phone}</a> · <a href={`mailto:${company.email}`}>{company.email}</a></p>
            <a href={directionsLink(company.address)} target="_blank" rel="noopener noreferrer">Cómo llegar →</a>
          </div>
          <div>
            <h2>Horario</h2>
            {hoursRows(hours).map(([days, text]) => <p key={days}>{days}: {text}</p>)}
          </div>
        </div>
        <div className="container at-footer__legal">
          <span>© {new Date().getFullYear()} {company.legalName}</span>
          <LegalLinks />
          <Link to={agendaPath}>Acceso para el salón</Link>
        </div>
      </footer>
      <BookingDrawer />
    </BookingProvider>
  );
}

function Header() {
  const openBooking = useOpenBooking();
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname, hash } = useLocation();
  useEffect(() => setMenuOpen(false), [pathname, hash]);
  useEffect(() => {
    document.documentElement.classList.toggle('at-locked', menuOpen);
    return () => document.documentElement.classList.remove('at-locked');
  }, [menuOpen]);

  const links = sections.map(([href, label]) => <Link key={href} to={`${site.base}/${href}`}>{label}</Link>);

  return (
    <header className="at-header">
      <div className="container at-header__inner">
        <button type="button" className="at-header__burger" aria-expanded={menuOpen} aria-controls="at-menu" onClick={() => setMenuOpen((o) => !o)}>
          {menuOpen ? <Close /> : <Menu />} <span className="sr-only">Menú</span>
        </button>
        <nav className="at-header__nav" aria-label="Secciones">{links.slice(0, 2)}</nav>
        <Link to={site.home} className="at-logo" aria-label={`${company.name}, inicio`}>
          <span className="at-logo__name">{company.name}</span>
          <span className="at-logo__tag">{company.tagline}</span>
        </Link>
        <div className="at-header__right">
          <nav className="at-header__nav" aria-label="Más secciones">{links.slice(2)}</nav>
          <VariantMenu />
          <button type="button" className="at-btn at-btn--line at-header__cta" onClick={() => openBooking()}>Reservar</button>
        </div>
      </div>
      {menuOpen && (
        <nav id="at-menu" className="at-menu" aria-label="Menú">
          {links}
          <button type="button" className="at-btn at-btn--solid" onClick={() => { setMenuOpen(false); openBooking(); }}>Reservar cita</button>
          <a href={telLink(company.phone)} className="at-menu__phone">{company.phone}</a>
        </nav>
      )}
    </header>
  );
}
