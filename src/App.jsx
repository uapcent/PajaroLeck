import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import ScrollManager from './components/ScrollManager.jsx';
import DemoSwitcher from './components/DemoSwitcher.jsx';
import { showDemoSwitcher } from './templates/index.js';
import restaurante from './templates/restaurante/config.js';
import peluqueria from './templates/peluqueria/config.js';

// Each template (with its fonts and styles) is loaded only when visited.
const Fontaneria = lazy(() => import('./templates/fontaneria/routes.jsx'));
const Restaurante = lazy(() => import('./templates/restaurante/routes.jsx'));
const Peluqueria = lazy(() => import('./templates/peluqueria/routes.jsx'));

export default function App() {
  return (
    <>
      <ScrollManager />
      {showDemoSwitcher && <DemoSwitcher />}
      <Suspense fallback={null}>
        <Routes>
          <Route path={`${restaurante.base}/*`} element={<Restaurante />} />
          <Route path={`${peluqueria.base}/*`} element={<Peluqueria />} />
          <Route path="/*" element={<Fontaneria />} />
        </Routes>
      </Suspense>
    </>
  );
}
