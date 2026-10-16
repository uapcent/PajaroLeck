// The three designs of the salon site. They share the business data (config.js) and the
// booking logic (useBooking.js, mockApi.js); each one has its own look and layout.
// A menu in each header switches between them (hidden with VITE_DEMO_SWITCHER=off).
export const variants = [
  { key: 'A', name: 'App', base: '/peluqueria', description: 'La reserva lo primero, como una aplicación' },
  { key: 'B', name: 'Atelier', base: '/peluqueria/atelier', description: 'Elegante y tranquila, como una revista' },
  { key: 'C', name: 'Estudio', base: '/peluqueria/estudio', description: 'Oscura y atrevida, con mucha foto' },
];

// The salon's own diary lives in design A and serves all three.
export const agendaPath = `${variants[0].base}/agenda`;
