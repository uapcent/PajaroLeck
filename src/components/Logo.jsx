import { useSite } from '../lib/site.js';

// Simple bird mark + wordmark. Swap for the client's own logo file:
// e.g. <img src="/logo.svg" alt={company.name} />
export default function Logo({ size = 'md', light = false }) {
  const { company } = useSite();
  return (
    <span className={`logo logo--${size} ${light ? 'logo--light' : ''}`}>
      <svg className="logo__mark" viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r="29" fill="none" stroke="var(--color-primary)" strokeWidth="5" />
        <path d="M14 38c6-1 10-5 13-11 3-6 8-10 15-10 3 0 5 1 7 3l5-1-3 5c0 11-8 19-20 19-7 0-12-2-17-5z" fill="var(--color-dark)" />
        <circle cx="43" cy="22" r="2" fill="var(--color-primary)" />
      </svg>
      <span className="logo__text">
        <span className="logo__name">{company.name}</span>
        <span className="logo__tag">{company.tagline}</span>
      </span>
    </span>
  );
}
