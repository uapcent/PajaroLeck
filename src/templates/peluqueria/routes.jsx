import { Route, Routes } from 'react-router-dom';
import '@fontsource/bricolage-grotesque/600.css';
import '@fontsource/bricolage-grotesque/700.css';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/600.css';
import './styles.css';
import SiteShell from '../../components/SiteShell.jsx';
import Legal, { legalRoutes } from '../../pages/Legal.jsx';
import NotFound from '../../pages/NotFound.jsx';
import site from './config.js';
import Layout from './Layout.jsx';
import Home from './Home.jsx';
import Agenda from './Agenda.jsx';

export default function PeluqueriaRoutes() {
  return (
    <SiteShell site={site}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="agenda" element={<Agenda />} />
          {legalRoutes.map(([path, page]) => (
            <Route key={path} path={path} element={<Legal page={page} />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </SiteShell>
  );
}
