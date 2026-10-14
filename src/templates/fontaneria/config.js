// ---------------------------------------------------------------
// Plantilla 1 – Fontanería (oficios: fontanero, electricista…)
// Objetivo: generar confianza y que el cliente llame.
// Todos los textos y datos están aquí. Colores y tipografías: styles.css
// ---------------------------------------------------------------
import { pexels, withBase } from '../../lib/site.js';

// Prefijo de la URL ('' = raíz del dominio, para la web de un cliente).
const base = '';
const to = withBase(base);

export const company = {
  name: 'Fontanería Martín',
  shortName: 'Martín',
  legalName: 'Fontanería Martín e Hijos S.L.',
  nif: 'B00000000',
  address: 'Calle Mayor 00, 12001 Castellón de la Plana',
  email: 'info@fontaneriamartin.example',
  phone: '964 000 000',
  whatsapp: '+34 600 000 000',
  since: 2003,
};

// Valoración que se muestra arriba del todo. Con un cliente real: la de su ficha de Google.
export const rating = { score: 4.9, count: 127, url: 'https://www.google.com/maps' };

export const hero = {
  title: 'Tu fontanero de confianza en Castellón',
  text: 'Fugas, atascos, calentadores y reformas de baño. Te damos el precio antes de empezar y lo dejamos todo limpio.',
  promises: ['Llegamos en menos de 1 hora', 'Precio cerrado, sin sorpresas', '2 años de garantía'],
};

export const whatsappMessage = 'Hola, necesito un fontanero. Os cuento:';

export const facts = [
  { value: `${new Date().getFullYear() - company.since}`, label: 'años arreglando casas en Castellón' },
  { value: '+3.500', label: 'trabajos terminados' },
  { value: '24 h', label: 'urgencias, también festivos' },
  { value: '600.000 €', label: 'seguro de responsabilidad civil' },
];

// icon: nombre de un icono de src/components/Icons.jsx
export const services = [
  { icon: 'Droplet', title: 'Fugas y averías', text: 'Localizamos la fuga sin romper de más y la reparamos en el momento.', from: 45, urgent: true },
  { icon: 'Pipe', title: 'Desatascos', text: 'Fregaderos, inodoros, duchas y bajantes. Con máquina, sin obras.', from: 60, urgent: true },
  { icon: 'Flame', title: 'Calentadores y termos', text: 'Reparación, cambio e instalación. Trabajamos con todas las marcas.', from: 50 },
  { icon: 'Shower', title: 'Bañera por plato de ducha', text: 'Más seguro y más cómodo. Lo cambiamos en un solo día.', from: 690 },
  { icon: 'Wrench', title: 'Reforma de baño', text: 'Del suelo al techo, con un único presupuesto cerrado y fecha de entrega.' },
  { icon: 'Tap', title: 'Grifos y cisternas', text: 'Cambio de grifería, cisternas que pierden agua, sanitarios.', from: 35 },
];

export const jobs = [
  {
    title: 'Bañera por plato de ducha',
    place: 'Castellón · 1 día de obra',
    before: { src: pexels(105934, 1200), alt: 'Baño con bañera antigua' },
    after: { src: pexels(7031570, 1200), alt: 'Baño con plato de ducha y mampara nueva' },
  },
  {
    title: 'Reforma completa de baño',
    place: 'Vila-real · 6 días de obra',
    before: { src: pexels(33996092, 1200), alt: 'Baño antiguo con azulejos de los años 70' },
    after: { src: pexels(7005268, 1200), alt: 'Baño reformado con ducha de cristal' },
  },
  {
    title: 'Cambio de tuberías de hierro',
    place: 'Benicàssim · 2 días de obra',
    before: { src: pexels(13312223, 1200), alt: 'Tuberías y llaves oxidadas' },
    after: { src: pexels(6419128, 1200), alt: 'Instalación nueva de tuberías' },
  },
];

// Reseñas de ejemplo. Con un cliente real: copiar solo reseñas reales de su ficha de Google.
export const reviews = [
  { name: 'María José G.', when: 'hace 2 semanas', text: 'Se nos rompió una tubería un domingo por la mañana y en 40 minutos estaban en casa. Muy limpios y el precio, el que nos dijeron por teléfono.' },
  { name: 'Vicent R.', when: 'hace 1 mes', text: 'Nos cambiaron la bañera por un plato de ducha para mi madre. En un día estaba hecho y sin dejar polvo. Totalmente recomendables.' },
  { name: 'Ana Belén M.', when: 'hace 1 mes', text: 'Llamé a tres fontaneros y fueron los únicos que vinieron a verlo antes de darme precio. Serios y puntuales.' },
  { name: 'Toni F.', when: 'hace 2 meses', text: 'El calentador dejó de funcionar en pleno enero. Vinieron esa misma tarde y lo arreglaron con una pieza que llevaban en la furgoneta.' },
  { name: 'Laura P.', when: 'hace 3 meses', text: 'Reformaron el baño entero. Nos explicaron todo, cumplieron las fechas y el resultado es precioso. Repetiremos con la cocina.' },
  { name: 'Pepe S.', when: 'hace 4 meses', text: 'Gente de toda la vida, de las de antes. Te dicen lo que hace falta y lo que no. Así da gusto.' },
];

export const steps = [
  { title: 'Nos llamas o escribes', text: 'Cuéntanos qué pasa. Si puedes, mándanos una foto por WhatsApp.' },
  { title: 'Precio cerrado', text: 'Te decimos cuánto cuesta antes de empezar. Si no te convence, no pagas nada.' },
  { title: 'Lo dejamos arreglado', text: 'Trabajamos limpio, te explicamos lo que hemos hecho y te damos factura y garantía.' },
];

export const towns = ['Castellón de la Plana', 'Grau de Castelló', 'Vila-real', 'Benicàssim', 'Almassora', 'Borriana', 'Onda', "l'Alcora", 'Borriol', 'Orpesa', 'Nules', 'Betxí'];

export const about = `Somos Martín y Javi, padre e hijo. Empezamos en ${company.since} con una furgoneta y hoy somos un equipo de cinco fontaneros, todos de aquí.`;

export const callbackTopics = ['Una fuga o avería', 'Un atasco', 'El calentador o termo', 'Una reforma de baño', 'Otra cosa'];

export default {
  id: 'fontaneria',
  demoLabel: 'Fontanería',
  demoDescription: 'Oficio: confianza, trabajos realizados, opiniones y llamada directa',
  title: `${company.name} · Fontanero en Castellón`,
  base,
  home: to('/'),
  company,
  privacyPurpose: 'Usamos los datos que nos envía únicamente para llamarle y preparar su presupuesto.',
};
