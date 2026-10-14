// Returns a price formatter for a template's currency config, e.g. { locale: 'en-IE', code: 'EUR' }.
export const priceFormatter = ({ locale, code }) => {
  const fmt = new Intl.NumberFormat(locale, { style: 'currency', currency: code });
  return (n) => fmt.format(n);
};
