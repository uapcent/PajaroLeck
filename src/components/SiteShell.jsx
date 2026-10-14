import { useEffect } from 'react';
import { SiteContext } from '../lib/site.js';

// Wraps one template: provides its config and scopes its styles under `.t-<id>`.
export default function SiteShell({ site, children }) {
  useEffect(() => {
    document.title = site.title;
  }, [site.title]);

  return (
    <SiteContext.Provider value={site}>
      <div className={`t-${site.id}`}>{children}</div>
    </SiteContext.Provider>
  );
}
