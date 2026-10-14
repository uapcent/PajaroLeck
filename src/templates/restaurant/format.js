import { priceFormatter } from '../../lib/format.js';
import { currency } from './config.js';

export const price = priceFormatter(currency);
