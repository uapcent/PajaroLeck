import { createContext, useContext } from 'react';

// The active template's config (company, contact details…). Provided by SiteShell.
export const SiteContext = createContext(null);
export const useSite = () => useContext(SiteContext);

// Builds paths under a template's base URL: withBase('/restaurante')('/carta') → '/restaurante/carta'.
export const withBase = (base) => (path) => (path === '/' ? base || '/' : base + path);

// Photos are loaded from Pexels (free to use, no attribution required:
// https://www.pexels.com/license/). To change one, open a photo on pexels.com,
// take the number at the end of its URL and pass it to pexels().
export const pexels = (id, width = 1600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;

// Click-to-chat link. `number` in international format, e.g. '+34 600 000 000'.
export const whatsappLink = (number, text = '') =>
  `https://wa.me/${number.replace(/\D/g, '')}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

export const telLink = (number) => `tel:${number.replace(/[^\d+]/g, '')}`;

// Google Maps directions to an address (opens the Maps app on phones).
export const directionsLink = (address) => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
