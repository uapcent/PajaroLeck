# PajaroLeck – Website Templates

React + Vite demo of three website templates for small businesses. A small **"Demo" dropdown**
(bottom-left) switches between them so clients can try each one.

| Template | URL | For | Backend |
|---|---|---|---|
| **Services** | `/` | Trades, repairs, installers, consultants | None (contact form + WhatsApp button) |
| **Restaurant** | `/restaurant` | Restaurants, bars, cafés | None (table requests go out as a WhatsApp message) |
| **Booking** | `/booking` | Hairdressers, barbers, physios | **Mocked** – see below |

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # production build in dist/
npm run preview  # serve the build
```

## Project layout

```
src/
  components/      shared UI (header, footer, hero, forms, WhatsApp button, demo switcher…)
  pages/           shared pages (legal, 404)
  lib/             helpers (site context, dates, prices, WhatsApp links)
  templates/
    services/      config.js + pages – Home, About, Services, Contact
    restaurant/    config.js + pages – Home, Menu (dietary filters), Reserve
    booking/       config.js + pages – Home, Book, Admin · mockApi.js · slots.js
```

Each template's `config.js` holds all its text, contact details, menu/services, images and
URL `base`. Shared components read the active template's config through `useSite()`.

## The booking demo

- Customers pick a service → day → free time → enter name and phone → get a confirmation with
  a booking code, an **Add to calendar** (.ics) button and a WhatsApp link to the salon.
- Free times come from the weekly `schedule` in `booking/config.js` (opening hours, slot step,
  days ahead, minimum notice) minus existing bookings (`slots.js`).
- `/booking/admin` is the owner view (demo password: `demo`): appointments per day, call, cancel.
- **`mockApi.js` is a fake backend.** It invents plausible appointments and keeps new ones in
  memory only – nothing is sent or stored, and a reload resets it. For a real client, replace
  the bodies of `listBookings`, `createBooking` and `cancelBooking` with calls to a small backend
  (e.g. PocketBase or Supabase); the UI does not need to change.

## Delivering one template to a client

1. Copy the project, keep only that template's folder and set `base = ''` in its `config.js`.
2. In `src/App.jsx`, mount only that template's routes; delete the others from `src/templates/index.js`.
3. Build with `VITE_DEMO_SWITCHER=off npm run build` to hide the demo dropdown.

## Rebranding

1. **Text, contact details, menu, services, hours** → the template's `config.js`
2. **Colors, fonts, radius** → CSS variables at the top of `src/styles.css`; per-template overrides
   in `.theme-restaurant` / `.theme-booking`
3. **Logo** → `src/components/Logo.jsx` (replace the SVG with an `<img>` of the client logo)
4. **Photos** → `images` in the config. Photos load by URL from
   [Pexels](https://www.pexels.com/license/) (free to use). Swap a Pexels photo ID, or replace
   any `src` with another URL or a file in `public/`. Photos that fail to load fall back to brand colors.
5. **WhatsApp** → `whatsapp` in the config (`null` hides the floating button)
6. **Contact form** → wire up a service (Formspree, EmailJS…) at the `TODO` in `templates/services/pages/Contact.jsx`
7. **Legal pages** → replace the placeholder copy in `src/pages/Legal.jsx` with text reviewed by the client's legal advisor

## Deployment

**GitHub Pages:** `.github/workflows/deploy.yml` builds and deploys on every push to `main`
(or the current default branch). One-time setup: *Settings → Pages → Build and deployment →
Source: GitHub Actions*. The site is served at `https://<user>.github.io/<repo>/`; the workflow
sets the base path automatically and copies `index.html` to `404.html` so deep links work.

**Other hosts:** run `npm run build` and upload `dist/`. Configure the host to serve `index.html`
for unknown paths (Netlify `_redirects`: `/* /index.html 200`; Vercel does this automatically).
To deploy under a sub-path, build with `BASE_PATH=/sub-path/ npm run build`.
