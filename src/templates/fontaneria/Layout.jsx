import { Link, Outlet } from 'react-router-dom';
import { LegalLinks } from '../../pages/Legal.jsx';
import { telLink, whatsappLink } from '../../lib/site.js';
import { Clock, Droplet, Mail, MapPin, Phone, WhatsApp } from '../../components/Icons.jsx';
import site, { about, company, whatsappMessage } from './config.js';

const sections = [
  ['#servicios', 'Servicios'],
  ['#trabajos', 'Trabajos'],
  ['#opiniones', 'Opiniones'],
  ['#zona', 'Dónde trabajamos'],
];

export default function Layout() {
  return (
    <>
      <header className="fx-header">
        <div className="fx-topline">
          <div className="container fx-topline__inner">
            <span><Clock width={16} height={16} /> Urgencias 24 horas, también festivos</span>
            <span className="fx-topline__extra"><MapPin width={16} height={16} /> Castellón y alrededores</span>
          </div>
        </div>
        <div className="container fx-header__inner">
          <Link to={site.home} className="fx-logo" aria-label={`${company.name}, inicio`}>
            <span className="fx-logo__mark"><Droplet width={22} height={22} /></span>
            <span className="fx-logo__text">
              <span>Fontanería</span>
              <strong>{company.shortName}</strong>
            </span>
          </Link>
          <nav className="fx-nav" aria-label="Secciones">
            {sections.map(([href, label]) => (
              <Link key={href} to={`${site.base}/${href}`}>{label}</Link>
            ))}
          </nav>
          <a className="fx-btn fx-btn--call fx-header__call" href={telLink(company.phone)}>
            <Phone width={20} height={20} /> <span className="fx-header__number">{company.phone}</span>
          </a>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="fx-footer">
        <div className="container fx-footer__grid">
          <div>
            <p className="fx-footer__name">{company.name}</p>
            <p>{about}</p>
          </div>
          <ul className="fx-footer__contact">
            <li><Phone width={18} height={18} /><a href={telLink(company.phone)}>{company.phone}</a></li>
            <li><Mail width={18} height={18} /><a href={`mailto:${company.email}`}>{company.email}</a></li>
            <li><MapPin width={18} height={18} /><span>{company.address}</span></li>
          </ul>
        </div>
        <div className="container fx-footer__legal">
          <span>© {new Date().getFullYear()} {company.legalName}</span>
          <LegalLinks />
        </div>
      </footer>

      {/* Mobile: call and WhatsApp always at hand */}
      <div className="fx-callbar">
        <a className="fx-btn fx-btn--call" href={telLink(company.phone)}><Phone width={20} height={20} /> Llamar</a>
        <a className="fx-btn fx-btn--wa" href={whatsappLink(company.whatsapp, whatsappMessage)} target="_blank" rel="noopener noreferrer">
          <WhatsApp width={20} height={20} /> WhatsApp
        </a>
      </div>
    </>
  );
}
