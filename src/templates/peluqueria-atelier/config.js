// ---------------------------------------------------------------
// Peluquería · diseño B "Atelier" – elegante y tranquilo, tipo revista.
// Los datos del negocio (servicios, equipo, horario…) son los de
// ../peluqueria/config.js; aquí solo van las fotos y textos propios de este diseño.
// ---------------------------------------------------------------
import { pexels, withBase } from '../../lib/site.js';
import salon, { company } from '../peluqueria/config.js';
import { variants } from '../peluqueria/variants.js';

const base = variants[1].base;
const to = withBase(base);

export const images = {
  hero: { src: pexels(11690875, 1200), alt: 'Melena rubia con ondas suaves, de perfil' },
  intro: [
    { src: pexels(7195805, 1000), alt: 'Lavacabezas del salón junto a una planta' },
    { src: pexels(15507425, 700), alt: 'Recogido de novia con ondas rubias' },
  ],
  services: { src: pexels(8468126, 900), alt: 'Mechas con papel de aluminio' },
  // Retrato de cada persona del equipo (por id de ../peluqueria/config.js).
  team: {
    carmen: { src: pexels(8834025, 800), alt: 'Carmen, de brazos cruzados en el salón' },
    lucia: { src: pexels(33867553, 800), alt: 'Lucía junto a un sillón del salón' },
    andres: { src: pexels(8468140, 800), alt: 'Andrés con delantal y plancha de pelo' },
  },
  gallery: [
    { src: pexels(27604284, 800), alt: 'Melena larga castaña con ondas' },
    { src: pexels(7752412, 800), alt: 'Rubio rosado de perfil' },
    { src: pexels(6391646, 800), alt: 'Ombré cobrizo con rizos' },
    { src: pexels(14153837, 800), alt: 'Ondas rubias' },
    { src: pexels(8030666, 800), alt: 'Melena lisa castaña con reflejos' },
    { src: pexels(20781288, 800), alt: 'Rubio ceniza con ondas' },
    { src: pexels(17328862, 800), alt: 'Media melena con mechas' },
    { src: pexels(10028673, 800), alt: 'Peinado con secador y cepillo' },
  ],
  visit: { src: pexels(3993308, 1000), alt: 'Tocadores del salón con luces' },
};

export const intro = {
  title: 'Un salón pequeño, sin prisas',
  text: 'Cada cita empieza con una conversación: qué te gusta de tu pelo, qué no y cuánto tiempo quieres dedicarle por la mañana. Después, el corte, el color o el peinado que de verdad te va.',
};

// Tres frases cortas bajo la portada.
export const promises = ['Diagnóstico sin compromiso', 'Productos profesionales', 'Café de cortesía'];

export default {
  ...salon,
  id: 'peluqueria-atelier',
  demoDescription: 'Diseño B: elegante y tranquilo',
  title: `${company.name} · ${company.tagline} en Castellón`,
  base,
  home: to('/'),
};
