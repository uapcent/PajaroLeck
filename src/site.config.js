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

// Photos are loaded from Pexels (free to use, no attribution required:
// https://www.pexels.com/license/). To change one, open a photo on pexels.com,
// take the number at the end of its URL and pass it to pexels().
const pexels = (id, width = 1600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;

export const images = {
  hero: [
    { src: pexels(12179114, 1920), alt: 'Grey heron in flight' }, // Phil Mitchell
    { src: pexels(721993, 1920), alt: 'Flock of birds flying at dusk' }, // Irina Iriser
    { src: pexels(31568289, 1920), alt: 'Bird in flight with open wings' }, // Bitnik Gao
  ],
  about: { src: pexels(4509635, 1200), alt: 'Two colorful birds perched on a branch' }, // Rajukhan Pathan
  pageBanner: { src: pexels(2867904, 1920), alt: 'Flock of birds in a clear sky' }, // Helena I
  services: {
    installations: { src: pexels(255435, 1200), alt: 'Kingfisher perched on a branch' }, // Pixabay
    maintenance: { src: pexels(11026003, 1200), alt: 'Chaffinch perched on a branch' }, // Phil Mitchell
    repairs: { src: pexels(2167039, 1200), alt: 'Blackbird perched on a branch' },
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
