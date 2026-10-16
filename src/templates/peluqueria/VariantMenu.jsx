import { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Layers } from '../../components/Icons.jsx';
import useDismiss from '../../lib/useDismiss.js';
import { showDemoSwitcher } from '../index.js';
import { variants } from './variants.js';

// Dropdown in the header of the three salon designs to jump between them.
// Its colours come from the active template's CSS variables.
export default function VariantMenu() {
  return showDemoSwitcher ? <Menu /> : null;
}

const matches = (pathname, base) => pathname === base || pathname.startsWith(`${base}/`);

function Menu() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const { pathname } = useLocation();
  // The longest matching base wins: /peluqueria/atelier is B, not A.
  const current = [...variants].sort((a, b) => b.base.length - a.base.length).find((v) => matches(pathname, v.base)) ?? variants[0];
  useDismiss(ref, open, () => setOpen(false));

  return (
    <div className="variant-menu" ref={ref}>
      <button type="button" className="variant-menu__toggle" aria-expanded={open} aria-haspopup="true" onClick={() => setOpen((o) => !o)}>
        <Layers width={16} height={16} />
        <span><span className="variant-menu__long">Diseño </span>{current.key}</span>
        <ChevronDown className={open ? 'is-flipped' : ''} />
      </button>
      {open && (
        <ul className="variant-menu__list">
          {variants.map((v) => (
            <li key={v.key}>
              <Link to={v.base} onClick={() => setOpen(false)} className={v === current ? 'is-current' : ''} aria-current={v === current ? 'page' : undefined}>
                <span className="variant-menu__key">{v.key}</span>
                <span>
                  <strong>{v.name}</strong>
                  <small>{v.description}</small>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
