import { Route, Routes } from 'react-router-dom';
import ScrollManager from './components/ScrollManager.jsx';
import SiteLayout from './components/SiteLayout.jsx';
import DemoSwitcher from './components/DemoSwitcher.jsx';
import { showDemoSwitcher } from './templates/index.js';
import services from './templates/services/config.js';
import restaurant from './templates/restaurant/config.js';
import booking from './templates/booking/config.js';
import ServicesRoutes from './templates/services/routes.jsx';
import RestaurantRoutes from './templates/restaurant/routes.jsx';
import BookingRoutes from './templates/booking/routes.jsx';

export default function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route path={`${restaurant.base}/*`} element={<SiteLayout site={restaurant}><RestaurantRoutes /></SiteLayout>} />
        <Route path={`${booking.base}/*`} element={<SiteLayout site={booking}><BookingRoutes /></SiteLayout>} />
        <Route path="/*" element={<SiteLayout site={services}><ServicesRoutes /></SiteLayout>} />
      </Routes>
      {showDemoSwitcher && <DemoSwitcher />}
    </>
  );
}
