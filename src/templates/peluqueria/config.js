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
// category agrupa la carta en los diseños B y C.
export const services = [
  { id: 'corte-mujer', category: 'Cortes', name: 'Corte mujer', detail: 'Lavar, cortar y peinar', duration: 45, price: 28 },
  { id: 'corte-hombre', category: 'Cortes', name: 'Corte hombre', detail: 'Lavar y cortar', duration: 30, price: 15 },
  { id: 'corte-barba', category: 'Barbería', name: 'Corte + barba', detail: 'Con toalla caliente', duration: 45, price: 22 },
  { id: 'barba', category: 'Barbería', name: 'Arreglo de barba', duration: 20, price: 10 },
  { id: 'tinte', category: 'Color', name: 'Tinte raíz', detail: 'Incluye lavado y peinado', duration: 90, price: 38 },
  { id: 'mechas', category: 'Color', name: 'Mechas', detail: 'Incluye lavado y peinado', duration: 120, price: 65 },
  { id: 'peinado', category: 'Peinados', name: 'Lavar y peinar', duration: 30, price: 18 },
  { id: 'infantil', category: 'Cortes', name: 'Corte infantil', detail: 'Hasta 12 años', duration: 20, price: 12 },
];

// Peluqueros. days: días que trabaja (0 = domingo).
// role y bio se ven en los diseños B y C.
export const stylists = [
  { id: 'carmen', name: 'Carmen', color: '#ff7aa2', days: [2, 3, 4, 5, 6], role: 'Corte y color', bio: 'Abrió Plumas en 2014. Si no sabes qué hacerte, pregúntale a ella.' },
  { id: 'lucia', name: 'Lucía', color: '#7cc6b5', days: [2, 3, 4, 5, 6], role: 'Mechas y recogidos', bio: 'Rubios, balayage y novias. Tiene una paciencia infinita.' },
  { id: 'andres', name: 'Andrés', color: '#f5b642', days: [2, 3, 4, 5], role: 'Barbería', bio: 'Degradados, navaja y toalla caliente. Y charla de fútbol si te apetece.' },
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
  // Fondo de la sección de precios (se ve oscurecido, casi como una textura).
  prices: { src: pexels(6599031, 1920) },
  // Fotos del equipo trabajando, junto al texto "Quiénes somos".
  team: [
    { src: pexels(3993453, 900), alt: 'Carmen cortando el pelo a una clienta' },
    { src: pexels(6599031, 900), alt: 'Andrés cortando el pelo a un cliente' },
    { src: pexels(7755222, 900), alt: 'Lucía terminando un corte con tijera y peine' },
  ],
};

// Opiniones de EJEMPLO para la demo. Con un cliente real, usar solo sus reseñas reales de Google.
export const rating = { score: 4.9, count: 212 };
export const reviews = [
  { name: 'Marta G.', when: 'hace 1 semana', text: 'Lucía me hizo unas mechas que parecen de sol de verdad. Me explicó todo y no tuve prisa en ningún momento.' },
  { name: 'Javier R.', when: 'hace 3 semanas', text: 'Andrés es un crack con la navaja. Pido cita desde el móvil en un minuto y nunca espero.' },
  { name: 'Rosa V.', when: 'hace 1 mes', text: 'Voy con mi hija desde que era pequeña. Carmen siempre sabe lo que nos queda bien.' },
  { name: 'Elena P.', when: 'hace 2 meses', text: 'Me peinaron para la boda de mi hermana y aguantó toda la noche. Trato de diez.' },
  { name: 'Vicent C.', when: 'hace 3 meses', text: 'Buen corte, buen precio y buen café. ¿Qué más se puede pedir?' },
];

export const since = 2014;
export const instagram = '@plumas.peluqueria';

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
