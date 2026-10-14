// Spanish price format: 13,50 € — whole amounts without decimals: 25 €.
const withCents = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' });
const whole = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

export const price = (n) => (Number.isInteger(n) ? whole : withCents).format(n);
