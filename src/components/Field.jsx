// Labelled form control with inline error. `as` can be 'input', 'textarea' or 'select'.
export default function Field({ label, name, as = 'input', error, ...rest }) {
  const Tag = as;
  return (
    <label className="form__field">
      <span>{label}</span>
      <Tag name={name} aria-invalid={!!error} rows={as === 'textarea' ? 5 : undefined} {...rest} />
      {error && <span className="form__error">{error}</span>}
    </label>
  );
}
