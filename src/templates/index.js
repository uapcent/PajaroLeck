// The three demo templates. To ship a single template to a client, keep only its
// folder, set `base = ''` in its config.js and mount only its routes in App.jsx.
import services from './services/config.js';
import restaurant from './restaurant/config.js';
import booking from './booking/config.js';

export const templates = [services, restaurant, booking];

// Floating demo dropdown. Hide it in a client build with: VITE_DEMO_SWITCHER=off npm run build
export const showDemoSwitcher = import.meta.env.VITE_DEMO_SWITCHER !== 'off';
