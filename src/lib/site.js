import { createContext, useContext } from 'react';

// The active template's config (company, nav, images…). Provided by SiteLayout.
export const SiteContext = createContext(null);
export const useSite = () => useContext(SiteContext);

// Builds paths under a template's base URL: withBase('/restaurant')('/menu') → '/restaurant/menu'.
export const withBase = (base) => (path) => (path === '/' ? base || '/' : base + path);

// Photos are loaded from Pexels (free to use, no attribution required:
// https://www.pexels.com/license/). To change one, open a photo on pexels.com,
// take the number at the end of its URL and pass it to pexels().
export const pexels = (id, width = 1600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;

// Click-to-chat link. `number` in international format, digits only or with +/spaces.
export const whatsappLink = (number, text = '') =>
  `https://wa.me/${number.replace(/\D/g, '')}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
