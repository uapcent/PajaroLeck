import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import ScrollManager from './components/ScrollManager.jsx';
import restaurante from './templates/restaurante/config.js';
import peluqueria from './templates/peluqueria/config.js';

// Each template (with its fonts and styles) is loaded only when visited.
const Fontaneria = lazy(() => import('./templates/fontaneria/routes.jsx'));
const Restaurante = lazy(() => import('./templates/restaurante/routes.jsx'));
const Peluqueria = lazy(() => import('./templates/peluqueria/routes.jsx'));
// Two more designs of the salon site (see templates/peluqueria/variants.js).
const PeluqueriaAtelier = lazy(() => import('./templates/peluqueria-atelier/routes.jsx'));
const PeluqueriaEstudio = lazy(() => import('./templates/peluqueria-estudio/routes.jsx'));

export default function App() {
  return (
    <>
      <ScrollManager />
      <Suspense fallback={null}>
        <Routes>
          <Route path={`${restaurante.base}/*`} element={<Restaurante />} />
          <Route path={`${peluqueria.base}/atelier/*`} element={<PeluqueriaAtelier />} />
          <Route path={`${peluqueria.base}/estudio/*`} element={<PeluqueriaEstudio />} />
          <Route path={`${peluqueria.base}/*`} element={<Peluqueria />} />
          <Route path="/*" element={<Fontaneria />} />
        </Routes>
      </Suspense>
    </>
  );
}
