import { Route, Routes } from 'react-router-dom';
import Legal from '../../pages/Legal.jsx';
import NotFound from '../../pages/NotFound.jsx';
import Home from './pages/Home.jsx';
import Book from './pages/Book.jsx';
import Admin from './pages/Admin.jsx';

export default function BookingRoutes() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="book" element={<Book />} />
      <Route path="admin" element={<Admin />} />
      <Route path="legal-notice" element={<Legal page="legal" />} />
      <Route path="privacy-policy" element={<Legal page="privacy" />} />
      <Route path="cookie-policy" element={<Legal page="cookies" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
