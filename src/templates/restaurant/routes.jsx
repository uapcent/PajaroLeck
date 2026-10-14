import { Route, Routes } from 'react-router-dom';
import Legal from '../../pages/Legal.jsx';
import NotFound from '../../pages/NotFound.jsx';
import Home from './pages/Home.jsx';
import Menu from './pages/Menu.jsx';
import Reserve from './pages/Reserve.jsx';

export default function RestaurantRoutes() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="menu" element={<Menu />} />
      <Route path="reserve" element={<Reserve />} />
      <Route path="legal-notice" element={<Legal page="legal" />} />
      <Route path="privacy-policy" element={<Legal page="privacy" />} />
      <Route path="cookie-policy" element={<Legal page="cookies" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
