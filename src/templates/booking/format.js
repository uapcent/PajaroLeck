import { priceFormatter } from '../../lib/format.js';
import { currency, services } from './config.js';

export const price = priceFormatter(currency);
export const serviceById = (id) => services.find((s) => s.id === id);
