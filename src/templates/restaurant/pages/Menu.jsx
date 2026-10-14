import { useState } from 'react';
import PageBanner from '../../../components/PageBanner.jsx';
import { menu, tags } from '../config.js';
import { price } from '../format.js';

// Tags that make sense as filters ("show me only…").
const filters = ['v', 'vg', 'gf'];

export default function Menu() {
  const [active, setActive] = useState([]);
  const toggle = (t) => setActive((a) => (a.includes(t) ? a.filter((x) => x !== t) : [...a, t]));
  const matches = (item) => active.every((t) => item.tags.includes(t) || (t === 'v' && item.tags.includes('vg')));

  return (
    <>
      <PageBanner eyebrow="Eat & drink" title="Menu" />
      <div className="menu-bar">
        <div className="container menu-bar__inner">
          <nav className="menu-bar__cats" aria-label="Menu sections">
            {menu.map((c) => (
              <a key={c.id} href={`#${c.id}`}>{c.title}</a>
            ))}
          </nav>
          <div className="menu-bar__filters" role="group" aria-label="Dietary filters">
            {filters.map((t) => (
              <button key={t} className={`chip ${active.includes(t) ? 'is-active' : ''}`} aria-pressed={active.includes(t)} onClick={() => toggle(t)}>
                {tags[t]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="section menu">
        <div className="container menu__inner">
          {menu.map((cat) => {
            const items = cat.items.filter(matches);
            return (
              <div key={cat.id} id={cat.id} className="menu__cat">
                <h2 className="menu__title">{cat.title}</h2>
                {items.length === 0 && <p className="menu__empty">Nothing in this section matches your filters.</p>}
                <ul className="menu__items">
                  {items.map((item) => (
                    <li key={item.name} className="menu__item">
                      <div className="menu__line">
                        <h3>{item.name}</h3>
                        <span className="menu__dots" aria-hidden="true" />
                        <span className="menu__price">{price(item.price)}</span>
                      </div>
                      <p>{item.description}</p>
                      {item.tags.length > 0 && (
                        <ul className="menu__tags">
                          {item.tags.map((t) => (
                            <li key={t} className={`tag tag--${t}`}>{tags[t]}</li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
          <p className="menu__note">Please tell us about any allergies – our team can tell you exactly what is in every dish.</p>
        </div>
      </section>
    </>
  );
}
