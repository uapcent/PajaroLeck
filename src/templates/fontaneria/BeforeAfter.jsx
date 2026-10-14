import { useState } from 'react';
import Photo from '../../components/Photo.jsx';

// Drag the handle (or use the arrow keys) to compare the "before" and "after" photos.
export default function BeforeAfter({ before, after, label }) {
  const [pos, setPos] = useState(50);
  return (
    <div className="fx-ba" style={{ '--pos': `${pos}%` }}>
      <Photo src={after.src} alt={after.alt} className="fx-ba__img" />
      <div className="fx-ba__before">
        <Photo src={before.src} alt={before.alt} className="fx-ba__img" />
      </div>
      <span className="fx-ba__tag fx-ba__tag--before">Antes</span>
      <span className="fx-ba__tag fx-ba__tag--after">Después</span>
      <span className="fx-ba__handle" aria-hidden="true"><span>‹ ›</span></span>
      <input
        type="range"
        min="0"
        max="100"
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="fx-ba__range"
        aria-label={`Comparar antes y después: ${label}`}
      />
    </div>
  );
}
