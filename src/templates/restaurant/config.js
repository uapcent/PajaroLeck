// ---------------------------------------------------------------
// Template 2 – Restaurant / bar / café
// Edit this file to rebrand the template for a new client.
// Colors live in src/styles.css under `.theme-restaurant`.
// ---------------------------------------------------------------
import { pexels, withBase } from '../../lib/site.js';

// URL prefix for this template ('' when it is the client's whole site).
const base = '/restaurant';
const to = withBase(base);

export const company = {
  name: 'El Nido',
  tagline: 'Kitchen & Wine Bar',
  legalName: 'El Nido Restauración S.L.',
  address: '8 Harbour Street, 12001 Springfield',
  email: 'hello@elnido.example',
  phones: ['+34 964 000 000'],
  designedBy: 'Your Studio',
};

export const currency = { locale: 'en-IE', code: 'EUR' };

// Reservations are sent as a pre-filled WhatsApp message – no backend needed.
export const whatsapp = {
  number: '+34 600 000 001',
  message: `Hi ${company.name}! I'd like to book a table.`,
};

export const images = {
  hero: [
    { src: pexels(262978, 1920), alt: 'Restaurant dining room with set tables' },
    { src: pexels(1279330, 1920), alt: 'Plate of fresh pasta' },
    { src: pexels(67468, 1920), alt: 'Warmly lit restaurant interior' },
  ],
  about: { src: pexels(67468, 1200), alt: 'Our dining room' },
  pageBanner: { src: pexels(262978, 1920), alt: 'Restaurant dining room' },
};

export const nav = [
  { label: 'Home', to: to('/') },
  { label: 'Menu', to: to('/menu') },
  { label: 'Visit us', to: to('/#visit') },
];

export const hero = {
  eyebrow: 'Seasonal Mediterranean cooking',
  title: company.name,
  titleAccent: 'Kitchen & Wine Bar',
  text: 'Market produce, wood-fired grill and a short list of natural wines, a few steps from the harbour.',
  cta: { label: 'See the menu', to: to('/menu') },
  secondaryCta: { label: 'Book a table', to: to('/reserve') },
};

export const about = {
  eyebrow: 'Our story',
  title: 'Welcome to',
  titleAccent: company.name,
  paragraphs: [
    'We opened in 2014 with <strong>twelve tables and one wood-fired grill</strong>. We still buy from the same fishermen and farmers every morning, and the menu changes with what they bring.',
    'Come for a quick lunch, stay for a long dinner. <strong>Groups, birthdays and private events</strong> are welcome – just ask.',
  ],
};

// Dietary tags shown as badges on menu items.
export const tags = {
  v: 'Vegetarian',
  vg: 'Vegan',
  gf: 'Gluten-free',
  spicy: 'Spicy',
};

// The whole menu. Prices are numbers; `featured` items also show on the home page.
export const menu = [
  {
    id: 'starters',
    title: 'Starters',
    items: [
      { name: 'Pan con tomate', description: 'Toasted sourdough, grated tomato, olive oil, sea salt.', price: 4.5, tags: ['vg'] },
      { name: 'Grilled octopus', description: 'Smoked paprika, crushed potatoes, aioli.', price: 16, tags: ['gf'], featured: true, image: pexels(3296279, 800) },
      { name: 'Burrata & peaches', description: 'Roasted peaches, basil, toasted hazelnuts.', price: 12.5, tags: ['v', 'gf'] },
      { name: 'Patatas bravas', description: 'Crispy potatoes, spicy tomato sauce, garlic mayo.', price: 7, tags: ['v', 'gf', 'spicy'] },
    ],
  },
  {
    id: 'mains',
    title: 'Mains',
    items: [
      { name: 'Seafood rice', description: 'Bomba rice, prawns, mussels and squid. For two, 25 min.', price: 38, tags: ['gf'], featured: true, image: pexels(16743486, 800) },
      { name: 'Fresh pasta of the day', description: 'Ask your waiter – hand-made every morning.', price: 15, tags: ['v'], image: pexels(1279330, 800) },
      { name: 'Wood-grilled sea bass', description: 'Charred lemon, fennel salad, herb oil.', price: 22, tags: ['gf'] },
      { name: 'Aubergine & chickpea stew', description: 'Slow-cooked with cumin, harissa and coriander.', price: 14, tags: ['vg', 'gf', 'spicy'] },
      { name: 'Iberian pork presa', description: 'Romesco, grilled spring onions.', price: 21, tags: ['gf'] },
    ],
  },
  {
    id: 'desserts',
    title: 'Desserts',
    items: [
      { name: 'Basque cheesecake', description: 'Burnt top, creamy middle.', price: 7, tags: ['v', 'gf'], featured: true, image: pexels(291528, 800) },
      { name: 'Chocolate & olive oil mousse', description: 'Sea salt, toasted bread crumbs.', price: 6.5, tags: ['vg'] },
      { name: 'Seasonal fruit', description: 'With mint and lime.', price: 5, tags: ['vg', 'gf'] },
    ],
  },
  {
    id: 'drinks',
    title: 'Drinks',
    items: [
      { name: 'House wine (glass)', description: 'Red, white or rosé from local producers.', price: 4, tags: ['vg'] },
      { name: 'Vermouth on tap', description: 'With orange and olive.', price: 3.5, tags: ['vg'] },
      { name: 'Craft beer', description: 'Rotating selection from the region.', price: 4.5, tags: [] },
      { name: 'Homemade lemonade', description: 'Lemon, mint, a little sugar.', price: 3.5, tags: ['vg', 'gf'] },
    ],
  },
];

// Shown on the home page and used for the reservation time picker.
export const openingHours = [
  ['Monday', 'Closed'],
  ['Tue – Thu', '13:00 – 16:00 · 20:00 – 23:00'],
  ['Fri – Sat', '13:00 – 16:00 · 20:00 – 00:00'],
  ['Sunday', '13:00 – 16:30'],
];
export const reservationTimes = ['13:00', '13:30', '14:00', '14:30', '15:00', '20:00', '20:30', '21:00', '21:30', '22:00'];
export const maxPartySize = 10;

// Map pin (OpenStreetMap embed, no API key needed). Find coordinates on openstreetmap.org.
export const location = { lat: 39.9726, lng: -0.0153 };

export const footerLinks = [
  { label: 'Menu', to: to('/menu') },
  { label: 'Book a table', to: to('/reserve') },
  { label: 'Legal notice', to: to('/legal-notice') },
  { label: 'Privacy policy', to: to('/privacy-policy') },
  { label: 'Cookie policy', to: to('/cookie-policy') },
];

export default {
  id: 'restaurant',
  demoLabel: 'Restaurant',
  demoDescription: 'Menu with dietary filters, opening hours, WhatsApp table booking',
  title: `${company.name} – ${company.tagline}`,
  base,
  home: to('/'),
  company,
  images,
  nav,
  headerCta: { label: 'Book a table', to: to('/reserve') },
  hero,
  footerLinks,
  footerLinksTitle: 'Explore',
  whatsapp,
  privacyPurpose: 'We use the details you send us only to manage your table reservation.',
};
