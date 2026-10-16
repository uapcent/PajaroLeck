import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { templates } from '../templates/index.js';
import useDismiss from '../lib/useDismiss.js';
import { ChevronDown, Grid } from './Icons.jsx';

// Small floating button (bottom left) to switch between the demos.
// Templates with their own bottom bar raise it with the --demo-offset CSS variable.
// Hide it in client builds with VITE_DEMO_SWITCHER=off.
export default function DemoSwitcher() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const { pathname } = useLocation();
  const current = templates.find((t) => t.base && pathname.startsWith(t.base)) ?? templates.find((t) => !t.base);

  useEffect(() => setOpen(false), [pathname]);
  useDismiss(ref, open, () => setOpen(false));

  return (
    <div className="demo-switcher" ref={ref}>
      {open && (
        <ul className="demo-switcher__menu">
          {templates.map((t) => (
            <li key={t.id}>
              <Link to={t.base || '/'} className={t === current ? 'is-current' : ''} aria-current={t === current ? 'page' : undefined}>
                <strong>{t.demoLabel}</strong>
                <span>{t.demoDescription}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <button className="demo-switcher__toggle" aria-expanded={open} aria-haspopup="true" onClick={() => setOpen((o) => !o)}>
        <Grid /> <span>Ejemplo: {current.demoLabel}</span> <ChevronDown className={open ? 'is-flipped' : ''} />
      </button>
    </div>
  );
}
