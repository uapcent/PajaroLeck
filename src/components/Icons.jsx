const base = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };

export const ArrowRight = (p) => (
  <svg {...base} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const ChevronDown = (p) => (
  <svg {...base} width={14} height={14} {...p}><path d="M6 9l6 6 6-6" /></svg>
);
export const MapPin = (p) => (
  <svg {...base} {...p}><path d="M3 11l18-8-8 18-2-8-8-2z" /></svg>
);
export const Mail = (p) => (
  <svg {...base} {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
);
export const Phone = (p) => (
  <svg {...base} {...p}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" /></svg>
);
export const Bolt = (p) => (
  <svg {...base} width={32} height={32} {...p}><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" /></svg>
);
export const Check = (p) => (
  <svg {...base} width={18} height={18} {...p}><path d="M5 12l5 5L20 7" /></svg>
);
export const Menu = (p) => (
  <svg {...base} width={24} height={24} {...p}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
);
export const Close = (p) => (
  <svg {...base} width={24} height={24} {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>
);
