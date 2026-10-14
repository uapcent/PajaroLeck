import { useState } from 'react';

// <img> that falls back to a coloured placeholder if the photo can't be loaded.
export default function Photo({ src, alt, className = '', loading = 'lazy' }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className={`photo-fallback ${className}`} role="img" aria-label={alt} />;
  return <img src={src} alt={alt} className={className} loading={loading} onError={() => setFailed(true)} />;
}
