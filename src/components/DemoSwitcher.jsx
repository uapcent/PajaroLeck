import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { templates } from '../templates/index.js';
import { ChevronDown } from './Icons.jsx';

// Thin strip above every demo: tells the prospect it's an example and lets them switch.
// Hide it in client builds with VITE_DEMO_SWITCHER=off.
export default function DemoSwitcher() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const { pathname } = useLocation();
  const current = templates.find((t) => t.base && pathname.startsWith(t.base)) ?? templates.find((t) => !t.base);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const close = (e) => {
      if (e.type === 'keydown' ? e.key === 'Escape' : !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', close);
    document.addEventListener('keydown', close);
    return () => {
      document.removeEventListener('pointerdown', close);
      document.removeEventListener('keydown', close);
    };
  }, [open]);

  return (
    <div className="demo-bar">
      <span className="demo-bar__text">Web de ejemplo</span>
      <div className="demo-bar__menu" ref={ref}>
        <button className="demo-bar__toggle" aria-expanded={open} aria-haspopup="true" onClick={() => setOpen((o) => !o)}>
          Ver otro ejemplo: <strong>{current.demoLabel}</strong> <ChevronDown className={open ? 'is-flipped' : ''} />
        </button>
        {open && (
          <ul className="demo-bar__list">
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
      </div>
    </div>
  );
}
