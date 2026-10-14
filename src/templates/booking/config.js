// ---------------------------------------------------------------
// Template 3 – Appointment booking (hairdresser, barber, physio…)
// Edit this file to rebrand the template for a new client.
// Colors live in src/styles.css under `.theme-booking`.
// The backend is mocked in mockApi.js – see the notes there.
// ---------------------------------------------------------------
import { pexels, withBase } from '../../lib/site.js';

// URL prefix for this template ('' when it is the client's whole site).
const base = '/booking';
const to = withBase(base);

export const company = {
  name: 'Plumas',
  tagline: 'Hair Studio',
  legalName: 'Plumas Peluquería S.L.',
  address: '27 Market Square, 12002 Springfield',
  email: 'hola@plumas.example',
  phones: ['+34 964 000 111'],
  whatsapp: '+34 600 000 002', // used in the booking confirmation
  designedBy: 'Your Studio',
};

export const currency = { locale: 'en-IE', code: 'EUR' };

// What customers can book. duration in minutes.
export const services = [
  { id: 'cut', name: 'Haircut & style', duration: 45, price: 25, description: 'Wash, cut and finish, any length.' },
  { id: 'trim', name: 'Quick trim', duration: 20, price: 14, description: 'Tidy up the ends or the neckline.' },
  { id: 'beard', name: 'Beard trim', duration: 20, price: 12, description: 'Shape, line-up and hot towel.' },
  { id: 'cut-beard', name: 'Haircut + beard', duration: 60, price: 34, description: 'The full works.' },
  { id: 'colour', name: 'Colour', duration: 90, price: 55, description: 'Full colour or roots, includes style.' },
  { id: 'kids', name: 'Kids cut', duration: 30, price: 15, description: 'Under 12s. Patience included.' },
];

// Weekly schedule used to build the free slots. Day 0 = Sunday. Empty = closed.
export const schedule = {
  hours: {
    0: [],
    1: [],
    2: [['09:30', '14:00'], ['16:00', '20:00']],
    3: [['09:30', '14:00'], ['16:00', '20:00']],
    4: [['09:30', '14:00'], ['16:00', '20:00']],
    5: [['09:30', '20:00']],
    6: [['09:00', '14:00']],
  },
  slotStep: 15, // minutes between possible start times
  daysAhead: 21, // how far ahead customers can book
  minNotice: 60, // minutes – no bookings starting sooner than this
};

export const openingHours = [
  ['Sun – Mon', 'Closed'],
  ['Tue – Thu', '09:30 – 14:00 · 16:00 – 20:00'],
  ['Friday', '09:30 – 20:00'],
  ['Saturday', '09:00 – 14:00'],
];

export const images = {
  hero: [
    { src: pexels(1813272, 1920), alt: 'Barber cutting a client’s hair' },
    { src: pexels(3993449, 1920), alt: 'Hair salon with styling chairs' },
    { src: pexels(3998429, 1920), alt: 'Stylist finishing a haircut' },
  ],
  about: { src: pexels(3993449, 1200), alt: 'Inside the studio' },
  pageBanner: { src: pexels(1813272, 1920), alt: 'Barber at work' },
};

export const nav = [
  { label: 'Home', to: to('/') },
  { label: 'Prices', to: to('/#prices') },
  { label: 'Owner area', to: to('/admin') },
];

export const hero = {
  eyebrow: 'Book online in 30 seconds',
  title: company.name,
  titleAccent: 'Hair Studio',
  text: 'Cuts, colour and beards by people who listen. Pick a time that suits you – no calls, no waiting.',
  cta: { label: 'Book now', to: to('/book') },
  secondaryCta: { label: 'See prices', to: to('/#prices') },
};

export const about = {
  eyebrow: 'Hello',
  title: 'This is',
  titleAccent: company.name,
  paragraphs: [
    'A small studio with <strong>three chairs and good coffee</strong>. We take our time with every client and we’ll always tell you honestly what will work for your hair.',
    'Book online any time, day or night. <strong>Running late or need to change?</strong> Just send us a WhatsApp.',
  ],
};

export const footerLinks = [
  { label: 'Book now', to: to('/book') },
  { label: 'Owner area', to: to('/admin') },
  { label: 'Legal notice', to: to('/legal-notice') },
  { label: 'Privacy policy', to: to('/privacy-policy') },
  { label: 'Cookie policy', to: to('/cookie-policy') },
];

export default {
  id: 'booking',
  demoLabel: 'Booking',
  demoDescription: 'Hairdresser – online appointments with free slots and an owner view',
  title: `${company.name} – ${company.tagline}`,
  base,
  home: to('/'),
  company,
  images,
  nav,
  headerCta: { label: 'Book now', to: to('/book') },
  hero,
  footerLinks,
  footerLinksTitle: 'Explore',
  whatsapp: null,
  privacyPurpose: 'We use the details you give us only to manage your appointment and to contact you about it.',
};
