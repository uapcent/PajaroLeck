import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useSite } from '../lib/site.js';
import Logo from './Logo.jsx';
import { ChevronDown, Menu, Close } from './Icons.jsx';

export default function Header() {
  const { nav, home, headerCta } = useSite();
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();

  useEffect(() => setOpen(false), [pathname, hash]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <header className="header">
      <div className="container header__inner">
        <Link to={home} className="header__logo" aria-label="Home">
          <Logo />
        </Link>

        <button className="header__toggle" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}>
          <Menu />
        </button>

        <div className={`header__panel ${open ? 'is-open' : ''}`}>
          <div className="header__panel-top">
            <Logo size="sm" />
            <button className="header__close" aria-label="Close menu" onClick={() => setOpen(false)}>
              <Close />
            </button>
          </div>
          <nav aria-label="Main">
            <ul className="nav">
              {nav.map((item) => (
                <li key={item.to} className={`nav__item ${item.children ? 'has-children' : ''}`}>
                  <NavLink to={item.to} end className="nav__link">
                    {item.label}
                    {item.children && <ChevronDown className="nav__chevron" />}
                  </NavLink>
                  {item.children && (
                    <ul className="nav__sub">
                      {item.children.map((child) => (
                        <li key={child.to}>
                          <Link to={child.to}>{child.label}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <Link to={headerCta.to} className="btn btn--primary header__cta">
            {headerCta.label}
          </Link>
        </div>
        <div className={`header__overlay ${open ? 'is-open' : ''}`} onClick={() => setOpen(false)} />
      </div>
    </header>
  );
}
