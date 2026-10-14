// Labelled form control with inline error. `as` can be 'input', 'textarea' or 'select'.
export default function Field({ label, name, as = 'input', error, hint, ...rest }) {
  const Tag = as;
  return (
    <label className="field">
      <span className="field__label">{label}</span>
      <Tag name={name} aria-invalid={!!error} rows={as === 'textarea' ? 4 : undefined} {...rest} />
      {hint && !error && <span className="field__hint">{hint}</span>}
      {error && <span className="field__error">{error}</span>}
    </label>
  );
}
