// ---------------------------------------------------------------
// Peluquería · diseño C "Estudio" – oscuro, atrevido y con mucha foto.
// Los datos del negocio (servicios, equipo, horario…) son los de
// ../peluqueria/config.js; aquí solo van las fotos y textos propios de este diseño.
// ---------------------------------------------------------------
import { pexels, withBase } from '../../lib/site.js';
import salon, { company } from '../peluqueria/config.js';
import { variants } from '../peluqueria/variants.js';

const base = variants[2].base;
const to = withBase(base);

export const images = {
  hero: [
    { src: pexels(19664876, 700), alt: 'Barbero cortando el pelo en el salón' },
    { src: pexels(12831449, 900), alt: 'Melena con ondas bajo luces de neón' },
    { src: pexels(3993320, 900), alt: 'Estilista aplicando color a una clienta' },
  ],
  // Foto de cada persona del equipo (por id de ../peluqueria/config.js).
  crew: {
    carmen: { src: pexels(3993302, 800), alt: 'Carmen sonriendo con su delantal' },
    lucia: { src: pexels(16890606, 800), alt: 'Lucía con unas tijeras' },
    andres: { src: pexels(5188621, 800), alt: 'Andrés con peine y tijeras, en blanco y negro' },
  },
  feed: [
    { src: pexels(12831452, 600), alt: 'Ondas castañas con luz de neón' },
    { src: pexels(20046793, 600), alt: 'Clienta sonriendo con su melena ondulada' },
    { src: pexels(2174113, 600), alt: 'Cliente en el sillón de barbero' },
    { src: pexels(18367697, 600), alt: 'Melena larga y lisa recién cortada' },
    { src: pexels(3356170, 600), alt: 'Corte a tijera' },
    { src: pexels(8468036, 600), alt: 'Aplicando decoloración para un rubio' },
    { src: pexels(14615063, 600), alt: 'Secado con cepillo redondo' },
    { src: pexels(20092122, 600), alt: 'Pelo recogido con pinzas antes del corte' },
  ],
};

// Cifras grandes bajo la carta. La nota media sale de config.js (rating).
export const stats = [
  ['+10', 'años en el barrio'],
  ['3', 'manos expertas'],
  ['30 s', 'para reservar'],
];

export default {
  ...salon,
  id: 'peluqueria-estudio',
  demoDescription: 'Diseño C: oscuro y atrevido',
  title: `${company.name} · ${company.tagline} en Castellón`,
  base,
  home: to('/'),
};
