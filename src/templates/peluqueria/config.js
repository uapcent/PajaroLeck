// ---------------------------------------------------------------
// Plantilla 3 – Peluquería / barbería / estética (citas)
// Objetivo: que el cliente habitual pida cita en pocos toques.
// Todos los textos y datos están aquí. Colores y tipografías: styles.css
// La "base de datos" es simulada: ver mockApi.js
// ---------------------------------------------------------------
import { pexels, withBase } from '../../lib/site.js';

// Prefijo de la URL ('' cuando es la web completa del cliente).
const base = '/peluqueria';
const to = withBase(base);

export const company = {
  name: 'Plumas',
  tagline: 'Peluquería',
  legalName: 'Plumas Peluquería S.L.',
  nif: 'B00000002',
  address: 'Calle Enmedio 00, 12001 Castellón de la Plana',
  email: 'hola@plumas.example',
  phone: '964 000 002',
  whatsapp: '+34 600 000 002',
};

// Servicios que se pueden reservar. duration en minutos.
export const services = [
  { id: 'corte-mujer', name: 'Corte mujer', detail: 'Lavar, cortar y peinar', duration: 45, price: 28 },
  { id: 'corte-hombre', name: 'Corte hombre', detail: 'Lavar y cortar', duration: 30, price: 15 },
  { id: 'corte-barba', name: 'Corte + barba', detail: 'Con toalla caliente', duration: 45, price: 22 },
  { id: 'barba', name: 'Arreglo de barba', duration: 20, price: 10 },
  { id: 'tinte', name: 'Tinte raíz', detail: 'Incluye lavado y peinado', duration: 90, price: 38 },
  { id: 'mechas', name: 'Mechas', detail: 'Incluye lavado y peinado', duration: 120, price: 65 },
  { id: 'peinado', name: 'Lavar y peinar', duration: 30, price: 18 },
  { id: 'infantil', name: 'Corte infantil', detail: 'Hasta 12 años', duration: 20, price: 12 },
];

// Peluqueros. days: días que trabaja (0 = domingo).
export const stylists = [
  { id: 'carmen', name: 'Carmen', color: '#ff7aa2', days: [2, 3, 4, 5, 6] },
  { id: 'lucia', name: 'Lucía', color: '#7cc6b5', days: [2, 3, 4, 5, 6] },
  { id: 'andres', name: 'Andrés', color: '#f5b642', days: [2, 3, 4, 5] },
];

// Horario semanal del salón. 0 = domingo. [] = cerrado.
export const hours = {
  0: [],
  1: [],
  2: [['09:30', '14:00'], ['16:00', '20:00']],
  3: [['09:30', '14:00'], ['16:00', '20:00']],
  4: [['09:30', '14:00'], ['16:00', '20:00']],
  5: [['09:30', '20:00']],
  6: [['09:00', '14:00']],
};

export const booking = {
  slotStep: 15, // minutos entre horas posibles
  daysAhead: 21, // con cuánta antelación se puede reservar
  minNotice: 60, // minutos mínimos antes de la cita
};

export const images = {
  banner: { src: pexels(7750099, 1920), alt: 'Interior del salón' },
};

export const about = 'Somos Carmen, Lucía y Andrés. Llevamos más de diez años cortando el pelo en el barrio, sin prisas y con buen café.';

export default {
  id: 'peluqueria',
  demoLabel: 'Peluquería',
  demoDescription: 'Citas online en pocos toques, para clientes de siempre',
  title: `${company.name} · ${company.tagline} en Castellón`,
  base,
  home: to('/'),
  company,
  privacyPurpose: 'Usamos los datos que nos da únicamente para gestionar su cita y avisarle si hubiera algún cambio.',
};
