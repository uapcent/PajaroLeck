import { Link } from 'react-router-dom';
import { company, footerLinks } from '../site.config.js';
import Logo from './Logo.jsx';
import { MapPin, Mail, Phone } from './Icons.jsx';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link to="/" aria-label="Home">
              <Logo size="lg" light />
            </Link>
          </div>
          <div>
            <h4 className="footer__title">Our company</h4>
            <ul className="footer__links">
              {footerLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="footer__title">Contact us</h4>
            <ul className="footer__contact">
              <li><MapPin /><span>{company.address}</span></li>
              <li><Mail /><a href={`mailto:${company.email}`}>{company.email}</a></li>
              <li><Phone /><span>{company.phones.join(' / ')}</span></li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">Designed by {company.designedBy}</div>
      </div>
    </footer>
  );
}
