import { useEffect } from 'react';
import { SiteContext } from '../lib/site.js';
import { showDemoSwitcher } from '../templates/index.js';
import DemoSwitcher from './DemoSwitcher.jsx';

// Wraps one template: provides its config and scopes its styles under `.t-<id>`.
// The demo switcher lives inside so it can read the template's --demo-offset.
export default function SiteShell({ site, children }) {
  useEffect(() => {
    document.title = site.title;
  }, [site.title]);

  return (
    <SiteContext.Provider value={site}>
      <div className={`t-${site.id}`}>
        {children}
        {showDemoSwitcher && <DemoSwitcher />}
      </div>
    </SiteContext.Provider>
  );
}
