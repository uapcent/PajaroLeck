// The three demo templates. Each one lives in its own folder with its own
// config.js (texts, contact details, prices…), components and styles.
//
// To ship a single template to a client: keep only its folder, set `base = ''`
// in its config.js, mount only its routes in App.jsx and build with
// VITE_DEMO_SWITCHER=off.
import fontaneria from './fontaneria/config.js';
import restaurante from './restaurante/config.js';
import peluqueria from './peluqueria/config.js';

export const templates = [fontaneria, restaurante, peluqueria];

export const showDemoSwitcher = import.meta.env.VITE_DEMO_SWITCHER !== 'off';
