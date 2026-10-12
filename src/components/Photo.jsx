import { useState } from 'react';

// <img> that falls back to a neutral placeholder if the file is missing.
export default function Photo({ src, alt, className = '' }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className={`photo-fallback ${className}`} role="img" aria-label={alt} />;
  return <img src={src} alt={alt} className={className} loading="lazy" onError={() => setFailed(true)} />;
}
