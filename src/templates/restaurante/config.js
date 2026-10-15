// ---------------------------------------------------------------
// Plantilla 2 – Restaurante / bar / casa de comidas
// Objetivo: enseñar la carta y el plato del día, y que reserven mesa.
// Todos los textos y datos están aquí. Colores y tipografías: styles.css
// ---------------------------------------------------------------
import { pexels, withBase } from '../../lib/site.js';

// Prefijo de la URL ('' cuando es la web completa del cliente).
const base = '/restaurante';
const to = withBase(base);

export const company = {
  name: 'El Nido',
  tagline: 'Casa de comidas',
  legalName: 'Restaurante El Nido S.L.',
  nif: 'B00000001',
  address: 'Plaza de la Pescadería 00, 12001 Castellón de la Plana',
  email: 'reservas@elnido.example',
  phone: '964 000 001',
  whatsapp: '+34 600 000 001',
  since: 1987,
};

// Horario semanal. 0 = domingo. [] = cerrado.
export const hours = {
  0: [['13:00', '16:30']],
  1: [],
  2: [['13:00', '16:00'], ['20:00', '23:30']],
  3: [['13:00', '16:00'], ['20:00', '23:30']],
  4: [['13:00', '16:00'], ['20:00', '23:30']],
  5: [['13:00', '16:00'], ['20:00', '23:30']],
  6: [['13:00', '16:00'], ['20:00', '23:30']],
};

export const images = {
  hero: { src: pexels(30457533, 1920), alt: 'Comedor del restaurante con vigas de madera' },
  gallery: [
    { src: pexels(33389174, 900), alt: 'Croquetas, patatas bravas y pan con tomate' },
    { src: pexels(8969237, 900), alt: 'Arroz con marisco en su paella' },
    { src: pexels(1581384, 900), alt: 'Mesa preparada en el comedor' },
    { src: pexels(19524049, 900), alt: 'Paella de marisco recién hecha' },
    { src: pexels(33703370, 900), alt: 'La barra del bar' },
    { src: pexels(30036946, 900), alt: 'Tapas variadas para compartir' },
    { src: pexels(30663889, 900), alt: 'Clientes comiendo en el comedor' },
    { src: pexels(225228, 900), alt: 'Copa de vino en la mesa' },
  ],
};

export const hero = {
  title: 'Cocina de casa y arroces a la leña',
  text: `Desde ${company.since} en el centro de Castellón. Producto del mercado de al lado y recetas de toda la vida.`,
};

// Plato del día: uno por día de la semana (0 = domingo). null = cerrado.
export const dailyDishes = {
  0: { name: 'Paella valenciana', text: 'De pollo y conejo, a la leña. Mínimo 2 personas.' },
  1: null,
  2: { name: 'Lentejas estofadas', text: 'Con chorizo, verduras y un toque de comino.' },
  3: { name: 'Arroz al horno', text: 'Con costilla, garbanzos, morcilla y patata.' },
  4: { name: 'Fideuà de marisco', text: 'Con gambas, sepia y alioli de la casa.' },
  5: { name: 'Arroz a banda', text: 'Con caldo de pescado de roca y alioli.' },
  6: { name: 'Olla de la Plana', text: 'El guiso de Castellón: alubias, cardo, garbanzos y pelotas.' },
};

export const dailyMenu = {
  price: 14.5,
  includes: 'Primero, segundo, postre o café, pan y bebida',
  when: 'De martes a viernes, al mediodía',
};

// Los 14 alérgenos de declaración obligatoria (Reglamento UE 1169/2011).
export const allergens = {
  gluten: 'Gluten',
  crustaceos: 'Crustáceos',
  huevo: 'Huevo',
  pescado: 'Pescado',
  cacahuetes: 'Cacahuetes',
  soja: 'Soja',
  lacteos: 'Lácteos',
  frutos: 'Frutos de cáscara',
  apio: 'Apio',
  mostaza: 'Mostaza',
  sesamo: 'Sésamo',
  sulfitos: 'Sulfitos',
  altramuces: 'Altramuces',
  moluscos: 'Moluscos',
};

// La carta. veg: 'vegetariano' | 'vegano'. Precios en euros.
export const menu = [
  {
    id: 'para-picar',
    title: 'Para picar',
    items: [
      { name: 'Croquetas caseras de jamón', note: '6 unidades', price: 9, allergens: ['gluten', 'huevo', 'lacteos'] },
      { name: 'Tomate de la huerta con ventresca', price: 12, allergens: ['pescado'] },
      { name: 'Calamares a la andaluza', price: 13, allergens: ['gluten', 'moluscos', 'huevo'] },
      { name: 'Patatas bravas de la casa', price: 7, allergens: ['huevo'], veg: 'vegetariano' },
      { name: 'Alcachofas a la plancha', note: 'De temporada', price: 10, allergens: [], veg: 'vegano' },
    ],
  },
  {
    id: 'arroces',
    title: 'Arroces',
    intro: 'Precio por persona. Mínimo 2 personas. Unos 25 minutos.',
    items: [
      { name: 'Paella valenciana', price: 15, allergens: ['apio'] },
      { name: 'Arroz a banda', price: 16, allergens: ['pescado', 'crustaceos', 'moluscos', 'huevo'] },
      { name: 'Arroz negro con alioli', price: 16, allergens: ['moluscos', 'crustaceos', 'pescado', 'huevo'] },
      { name: 'Arroz de verduras de temporada', price: 13, allergens: ['apio'], veg: 'vegano' },
    ],
  },
  {
    id: 'principales',
    title: 'Carnes y pescados',
    items: [
      { name: 'Pescado de lonja del día', note: 'Pregunta qué ha llegado hoy', price: 19, allergens: ['pescado'] },
      { name: 'Pulpo a la brasa con patata', price: 18, allergens: ['moluscos'] },
      { name: 'Entrecot de ternera', note: 'Con patatas y pimientos', price: 22, allergens: [] },
      { name: 'Albóndigas de la abuela', price: 14, allergens: ['gluten', 'huevo', 'lacteos', 'apio'] },
    ],
  },
  {
    id: 'postres',
    title: 'Postres caseros',
    items: [
      { name: 'Flan de huevo', price: 5, allergens: ['huevo', 'lacteos'], veg: 'vegetariano' },
      { name: 'Tarta de queso', price: 6, allergens: ['lacteos', 'huevo', 'gluten'], veg: 'vegetariano' },
      { name: 'Naranja de Castellón con miel y canela', price: 5, allergens: [], veg: 'vegetariano' },
      { name: 'Coulant de chocolate', price: 6, allergens: ['gluten', 'huevo', 'lacteos', 'soja'], veg: 'vegetariano' },
    ],
  },
];

// Filtros de la carta: [id, texto, función que dice si un plato lo cumple]
export const menuFilters = [
  ['sin-gluten', 'Sin gluten', (item) => !item.allergens.includes('gluten')],
  ['sin-lacteos', 'Sin lácteos', (item) => !item.allergens.includes('lacteos')],
  ['vegetariano', 'Vegetariano', (item) => !!item.veg],
];

export const reservation = {
  maxPeople: 10, // grupos más grandes: por teléfono
  slotStep: 30, // minutos entre horas de reserva
  lastBookingBeforeClose: 60, // última reserva X minutos antes de cerrar
  daysAhead: 14,
};

// Mapa (OpenStreetMap, sin clave). Coordenadas desde openstreetmap.org
export const location = { lat: 39.9858, lng: -0.0378 };

export default {
  id: 'restaurante',
  demoLabel: 'Restaurante',
  demoDescription: 'Carta, plato del día y reserva de mesa siempre a mano',
  title: `${company.name} · ${company.tagline} en Castellón`,
  base,
  home: to('/'),
  company,
  privacyPurpose: 'Usamos los datos que nos envía únicamente para gestionar su reserva.',
};
