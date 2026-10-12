// ---------------------------------------------------------------
// Edit this file to rebrand the template for a new client.
// Colors and fonts live in src/styles.css (:root variables).
// ---------------------------------------------------------------

export const company = {
  name: 'PajaroLeck',
  tagline: 'Technical Service',
  legalName: 'PajaroLeck Services S.L.',
  founded: 2006,
  address: '123 Industrial Avenue, Unit 48, 12005 Springfield',
  email: 'info@pajaroleck.com',
  phones: ['+34 900 000 000', '+34 600 000 000'],
  designedBy: 'Your Studio',
};

// All photos are served from /public/images (prefixed with the site base path).
const img = (file) => `${import.meta.env.BASE_URL}images/${file}`;

// All photos are served from /public/images. Replace the files (or the
// paths) to change them. `alt` text is used for accessibility.
export const images = {
  hero: [
    { src: img('hero-1.jpg'), alt: 'Bird in flight' },
    { src: img('hero-2.jpg'), alt: 'Bird perched on a branch' },
    { src: img('hero-3.jpg'), alt: 'Flock of birds over the sky' },
  ],
  about: { src: img('about.jpg'), alt: 'Pair of birds on a wire' },
  pageBanner: { src: img('banner.jpg'), alt: 'Bird landscape' },
  services: {
    installations: { src: img('service-installations.jpg'), alt: 'Bird building a nest' },
    maintenance: { src: img('service-maintenance.jpg'), alt: 'Bird preening its feathers' },
    repairs: { src: img('service-repairs.jpg'), alt: 'Woodpecker on a tree trunk' },
  },
};

export const nav = [
  { label: 'Home', to: '/' },
  {
    label: 'About us',
    to: '/about',
    children: [
      { label: 'Residential & Commercial Installations', to: '/services#installations' },
      { label: 'Civil Works & Industrial Installations', to: '/services#civil-works' },
      { label: 'Industrial & Logistics Machinery', to: '/services#machinery' },
    ],
  },
  { label: 'Services', to: '/services' },
];

export const hero = {
  eyebrow: 'Trust our professionals',
  title: company.name,
  titleAccent: 'Technical Service & Installations',
  text: 'We are ready to make it happen, with guarantee and commitment.',
  cta: { label: 'Contact us', to: '/contact' },
};

export const about = {
  eyebrow: 'Who we are',
  title: 'About',
  titleAccent: company.name,
  paragraphs: [
    `<strong>${company.legalName}</strong> was born from the need to offer the best possible service to our customers. Our company started in ${company.founded} when a client asked for a specialist in logistics systems. Since then we have kept evolving and expanding into new sectors.`,
    'We offer a <strong>wide range of services, including logistics (mechanical and electrical), ceramics, machinery modification, installation, repair and maintenance of machinery.</strong>',
  ],
};

// Cards on the home page (style: "image" | "accent" | "dark")
export const serviceCards = [
  { title: 'Installations', style: 'image', image: images.services.installations, to: '/services#installations' },
  { title: 'Maintenance', style: 'accent', to: '/services#civil-works' },
  { title: 'Repairs', style: 'dark', to: '/services#machinery' },
];

// Detailed sections on the Services page
export const serviceDetails = [
  {
    id: 'installations',
    title: 'Residential & Commercial Installations',
    image: images.services.installations,
    text: 'Electrical installations for homes, shops and offices: new builds, renovations, lighting, solar panels and certification. Clean work, on time and to code.',
    points: ['Electrical wiring and panels', 'Solar panel systems', 'Lighting and automation', 'Inspections and certificates'],
  },
  {
    id: 'civil-works',
    title: 'Civil Works & Industrial Installations',
    image: images.services.maintenance,
    text: 'From groundwork to commissioning, we plan and execute industrial installations and keep them running with preventive maintenance plans.',
    points: ['Industrial power distribution', 'Civil works and trenching', 'Preventive maintenance plans', '24/7 emergency response'],
  },
  {
    id: 'machinery',
    title: 'Industrial & Logistics Machinery',
    image: images.services.repairs,
    text: 'Mechanical and electrical repair, modification and upgrades of production lines, conveyors and logistics equipment.',
    points: ['Mechanical and electrical repairs', 'Machinery modification', 'Conveyor and logistics systems', 'Spare parts management'],
  },
];

export const footerLinks = [
  { label: 'About us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Contact', to: '/contact' },
  { label: 'Legal notice', to: '/legal-notice' },
  { label: 'Privacy policy', to: '/privacy-policy' },
  { label: 'Cookie policy', to: '/cookie-policy' },
];
