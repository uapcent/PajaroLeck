import { useEffect } from 'react';
import { SiteContext } from '../lib/site.js';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import WhatsAppButton from './WhatsAppButton.jsx';

// Wraps one template: provides its config, applies its color theme and title.
export default function SiteLayout({ site, children }) {
  useEffect(() => {
    document.title = site.title;
  }, [site.title]);

  return (
    <SiteContext.Provider value={site}>
      <div className={`site theme-${site.id}`}>
        <Header />
        <main id="content">{children}</main>
        <Footer />
        {site.whatsapp && <WhatsAppButton />}
      </div>
    </SiteContext.Provider>
  );
}
