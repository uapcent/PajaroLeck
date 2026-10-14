import { Link } from 'react-router-dom';
import { useSite } from '../lib/site.js';

// Casilla de consentimiento (RGPD), obligatoria en todo formulario con datos personales.
export default function PrivacyConsent({ checked, onChange, error, name = 'privacy' }) {
  const { base } = useSite();
  return (
    <div className="consent">
      <label className="consent__label">
        <input type="checkbox" name={name} checked={checked} onChange={onChange} />
        <span>
          He leído y acepto la <Link to={`${base}/politica-de-privacidad`}>política de privacidad</Link>.
        </span>
      </label>
      {error && <span className="field__error">{error}</span>}
    </div>
  );
}
