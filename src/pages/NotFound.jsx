import { Link } from 'react-router-dom';
import { useSite } from '../lib/site.js';

export default function NotFound() {
  const { home } = useSite();
  return (
    <div className="legal-page legal-page--center">
      <h1>Página no encontrada</h1>
      <p>La página que buscas no existe o ha cambiado de sitio.</p>
      <Link to={home} className="legal-page__home">Volver al inicio</Link>
    </div>
  );
}
