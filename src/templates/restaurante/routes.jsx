import { Route, Routes } from 'react-router-dom';
import '@fontsource/fraunces/600.css';
import '@fontsource/fraunces/600-italic.css';
import '@fontsource/caveat/600.css';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/600.css';
import './styles.css';
import SiteShell from '../../components/SiteShell.jsx';
import Legal, { legalRoutes } from '../../pages/Legal.jsx';
import NotFound from '../../pages/NotFound.jsx';
import site from './config.js';
import Layout from './Layout.jsx';
import Home from './Home.jsx';

export default function RestauranteRoutes() {
  return (
    <SiteShell site={site}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          {legalRoutes.map(([path, page]) => (
            <Route key={path} path={path} element={<Legal page={page} />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </SiteShell>
  );
}
