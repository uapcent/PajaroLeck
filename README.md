# PajaroLeck – Webs de ejemplo

React + Vite demo of three Spanish-language websites for small businesses. Each one has its own
look, layout and main action, so a prospect can't mistake one for another. A small
**"Ejemplo"** button in the bottom-left corner switches between them.

| Template | URL | Business | Main action | Backend |
|---|---|---|---|---|
| **Fontanería** | `/` | Fontanería Martín (plumber) | Call / WhatsApp | None |
| **Restaurante** | `/restaurante` | El Nido (casa de comidas) | Reserve a table | None (request goes out by WhatsApp) |
| **Peluquería** | `/peluqueria` | Plumas (hair salon) | Book an appointment | **Mocked** – see below |

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # production build in dist/
npm run preview  # serve the build
```

## What each template does

**Fontanería** – one page built to earn trust before the call.
Google rating at the top, phone number in large type, services with "desde" prices,
before/after photo sliders, reviews (fictional for the demo – use only the client's real
Google reviews), how we work, towns covered, and a "call me back" form. On phones a bar with
**Llamar | WhatsApp** stays at the bottom.

**Restaurante** – the menu and the dish of the day, with booking always at hand.
A chalkboard shows today's dish (one per weekday, set in the config) and the menú del día.
The carta lists the allergens of every dish (EU Regulation 1169/2011) with filters
(sin gluten, sin lácteos, vegetariano). A bar at the bottom shows whether the restaurant is
open and a **Reservar mesa** button; when you reach the reservation section the bar "lands"
there and opens into the form. The request is sent as a pre-filled WhatsApp message.

**Peluquería** – the booking comes first.
Service → stylist ("me da igual" or a name) → day and free time → name and phone. Each step
folds into a summary once answered. Days that can't be booked are greyed out with the reason:
*cerrado*, *completo* (no free time left for that service) or *descansa* (the chosen stylist is off). The confirmation offers "Guardar en mi calendario" (.ics)
and a WhatsApp link to change the appointment. Hours, prices and a two-line "about" come
after. `/peluqueria/agenda` is the salon's view (demo password: `demo`).
Nothing about the customer is remembered between visits.

**The booking backend is simulated** (`templates/peluqueria/mockApi.js`): it invents plausible
appointments and keeps new ones in memory only, so a reload resets it. For a real client,
replace the bodies of `listBookings`, `createBooking` and `cancelBooking` with calls to a small
backend (e.g. PocketBase or Supabase); the pages don't need to change.

## Project layout

```
src/
  styles.css        base styles shared by all templates (forms, legal pages, demo switcher)
  components/       invisible plumbing: form fields, consent checkbox, icons, demo switcher…
  pages/            legal pages in Spanish (aviso legal, privacidad, cookies) and 404
  lib/              helpers: Spanish dates and prices, opening hours, WhatsApp/phone links
  templates/
    fontaneria/     config.js · Layout · Home · BeforeAfter · styles.css
    restaurante/    config.js · Layout · Home · slots.js · styles.css
    peluqueria/     config.js · Layout · Home · Booking · Agenda · mockApi.js · styles.css
```

Each template has its own header, footer, fonts and stylesheet (scoped under `.t-<name>`) and
is only downloaded when visited. **All texts, prices, hours, dishes and photos are in that
template's `config.js`.**

## Delivering one template to a client

1. Keep only that template's folder and set `base = ''` in its `config.js`.
2. In `src/App.jsx`, mount only that template's routes; remove the others from `src/templates/index.js`.
3. Build with `VITE_DEMO_SWITCHER=off npm run build` to hide the demo switcher.
4. Fill in the real company details (name, NIF, address) – they also feed the legal pages –
   and have the client's legal advisor review the legal texts in `src/pages/Legal.jsx`.
5. Photos load by URL from [Pexels](https://www.pexels.com/license/) (free to use). Swap the
   photo ID in `config.js`, or use any URL or a file in `public/`. Photos that fail to load
   fall back to a colour block.

## Deployment

**GitHub Pages:** `.github/workflows/deploy.yml` builds and deploys on every push to `main`
(or the current default branch). One-time setup: *Settings → Pages → Build and deployment →
Source: GitHub Actions*. The site is served at `https://<user>.github.io/<repo>/`; the workflow
sets the base path automatically and copies `index.html` to `404.html` so deep links work.

**Other hosts:** run `npm run build` and upload `dist/`. Configure the host to serve `index.html`
for unknown paths (Netlify `_redirects`: `/* /index.html 200`; Vercel does this automatically).
To deploy under a sub-path, build with `BASE_PATH=/sub-path/ npm run build`.
