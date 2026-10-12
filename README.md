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
4. **Photos** → `images` in `src/site.config.js`. Bird photos are loaded by URL from
   [Pexels](https://www.pexels.com/license/) (free to use). Swap a Pexels photo ID, or replace
   any `src` with another URL or a file in `public/`. Photos that fail to load fall back to brand colors.
5. **Contact form** → wire up a backend/service (Formspree, EmailJS…) at the `TODO` in `src/pages/Contact.jsx`
6. **Legal pages** → replace the placeholder copy in `src/pages/Legal.jsx` with text reviewed by the client's legal advisor

## Deployment

**GitHub Pages:** `.github/workflows/deploy.yml` builds and deploys on every push to `main`
(or the current default branch). One-time setup: *Settings → Pages → Build and deployment →
Source: GitHub Actions*. The site is served at `https://<user>.github.io/<repo>/`; the workflow
sets the base path automatically and copies `index.html` to `404.html` so deep links work.

**Other hosts:** run `npm run build` and upload `dist/`. Configure the host to serve `index.html`
for unknown paths (Netlify `_redirects`: `/* /index.html 200`; Vercel does this automatically).
To deploy under a sub-path, build with `BASE_PATH=/sub-path/ npm run build`.
