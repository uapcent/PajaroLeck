# PajaroLeck – Technical Services Website Template

React + Vite template for technical-service businesses (installations, maintenance, repairs).
Layout modelled on a classic service-company site: sticky header with dropdown, hero slideshow,
about section, service cards, inner pages and a dark footer.

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # production build in dist/
npm run preview  # serve the build
```

## Pages

| Route | Content |
|---|---|
| `/` | Hero slideshow (Ken Burns), About, Services cards |
| `/about` | Banner, About with photo, stats, Services cards |
| `/services` | Three detailed services (`#installations`, `#civil-works`, `#machinery`) |
| `/contact` | Contact info + validated form (front-end only) |
| `/legal-notice`, `/privacy-policy`, `/cookie-policy` | Placeholder legal text |

## Rebranding for a client

1. **Text, contact details, menu, services** → `src/site.config.js`
2. **Colors, fonts, radius** → CSS variables at the top of `src/styles.css`
3. **Logo** → `src/components/Logo.jsx` (replace the SVG with an `<img>` of the client logo)
4. **Photos** → put files in `public/images/` using the names listed in `src/site.config.js`
   (`hero-1.jpg`, `hero-2.jpg`, `hero-3.jpg`, `about.jpg`, `banner.jpg`,
   `service-installations.jpg`, `service-maintenance.jpg`, `service-repairs.jpg`).
   Missing photos fall back to a brand-colored gradient.
5. **Contact form** → wire up a backend/service (Formspree, EmailJS…) at the `TODO` in `src/pages/Contact.jsx`
6. **Legal pages** → replace the placeholder copy in `src/pages/Legal.jsx` with text reviewed by the client's legal advisor

## Deployment note

The site uses client-side routing. Configure your host to serve `index.html` for unknown paths
(Netlify `_redirects`: `/* /index.html 200`; Vercel does this automatically for Vite).
