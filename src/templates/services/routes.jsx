import { Route, Routes } from 'react-router-dom';
import Legal from '../../pages/Legal.jsx';
import NotFound from '../../pages/NotFound.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Services from './pages/Services.jsx';
import Contact from './pages/Contact.jsx';

export default function ServicesRoutes() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="services" element={<Services />} />
      <Route path="contact" element={<Contact />} />
      <Route path="legal-notice" element={<Legal page="legal" />} />
      <Route path="privacy-policy" element={<Legal page="privacy" />} />
      <Route path="cookie-policy" element={<Legal page="cookies" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
