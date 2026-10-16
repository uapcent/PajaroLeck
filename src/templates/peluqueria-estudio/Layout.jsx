import { Link, Outlet } from 'react-router-dom';
import { LegalLinks } from '../../pages/Legal.jsx';
import { telLink, whatsappLink } from '../../lib/site.js';
import { ArrowRight, Phone, WhatsApp } from '../../components/Icons.jsx';
import { company } from '../peluqueria/config.js';
import { agendaPath } from '../peluqueria/variants.js';
import VariantMenu from '../peluqueria/VariantMenu.jsx';
import site from './config.js';
import Wizard, { WizardProvider, useOpenWizard } from './Wizard.jsx';

const sections = [['#menu', 'Menú'], ['#crew', 'Crew'], ['#feed', 'Feed'], ['#visitanos', 'Visítanos']];

export default function Layout() {
  return (
    <WizardProvider>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer className="es-footer">
        <p className="es-footer__giant" aria-hidden="true">{company.name}</p>
        <div className="container es-footer__row">
          <span>© {new Date().getFullYear()} {company.legalName}</span>
          <span>{company.address}</span>
          <span className="es-footer__links">
            <LegalLinks />
            <Link to={agendaPath}>Acceso para el salón</Link>
          </span>
        </div>
      </footer>
      <BottomBar />
      <Wizard />
    </WizardProvider>
  );
}

function Header() {
  const openWizard = useOpenWizard();
  return (
    <header className="es-header">
      <div className="container es-header__inner">
        <Link to={site.home} className="es-logo" aria-label={`${company.name}, inicio`}>{company.name}<span>✦</span></Link>
        <nav className="es-header__nav" aria-label="Secciones">
          {sections.map(([href, label]) => <Link key={href} to={`${site.base}/${href}`}>{label}</Link>)}
        </nav>
        <VariantMenu />
        <button type="button" className="es-btn es-btn--lime es-header__cta" onClick={() => openWizard()}>Reserva</button>
      </div>
    </header>
  );
}

// Phones: booking, call and WhatsApp always at hand.
function BottomBar() {
  const openWizard = useOpenWizard();
  return (
    <div className="es-bar">
      <button type="button" className="es-bar__book" onClick={() => openWizard()}>Reserva tu cita <ArrowRight /></button>
      <a className="es-bar__icon" href={telLink(company.phone)} aria-label={`Llamar al ${company.phone}`}><Phone /></a>
      <a className="es-bar__icon" href={whatsappLink(company.whatsapp)} target="_blank" rel="noopener noreferrer" aria-label="Escribir por WhatsApp"><WhatsApp /></a>
    </div>
  );
}
