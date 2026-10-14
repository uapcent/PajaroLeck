import { Link } from 'react-router-dom';
import { useSite } from '../lib/site.js';

// GDPR consent checkbox, required on every form that collects personal data.
export default function PrivacyConsent({ checked, onChange, error, name = 'privacy' }) {
  const { base } = useSite();
  return (
    <>
      <label className="form__check">
        <input type="checkbox" name={name} checked={checked} onChange={onChange} />
        <span>I have read and accept the <Link to={`${base}/privacy-policy`}>privacy policy</Link>.</span>
      </label>
      {error && <span className="form__error">{error}</span>}
    </>
  );
}
