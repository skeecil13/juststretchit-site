# Just Stretch It — marketing website

Static marketing site for **Just Stretch It**, a one-on-one assisted-stretch & mobility
studio in Flower Mound, TX. Built from the Just Stretch It design system.

No framework, no build step — plain HTML, one CSS file, one small JS file. Deploys
as static files to any static host (GitHub Pages, Netlify, Cloudflare Pages, …).

## Structure

```
index.html      All page sections (header, hero, trust bar, first-stretch CTA,
                about, sessions, packages, testimonials, contact, footer).
styles.css      Design-system tokens + component styles (Button, Card, Badge, …).
main.js         Mobile nav toggle + contact-form submit (posts to FormSubmit).
assets/         Logos (green/white/plum) and studio photography.
fonts/          Afterglow-Regular.ttf (brand display serif).
```

Body/UI type is **Mulish** (Google Fonts); display type is **Afterglow** (bundled).
Icons are inlined **Lucide** SVGs (no runtime CDN dependency).

## Booking & contact

- Every booking button deep-links to the studio's **Vagaro** pages (open in a new tab).
- The contact form posts directly to `sharifa@juststretchitfm.com` via
  [FormSubmit](https://formsubmit.co) — no server required.
  **First-time activation:** the very first submission triggers a one-time confirmation
  email from FormSubmit to that address; click the link in it once to start delivery.

## Run locally

```
cd site
python3 -m http.server 8099   # then open http://localhost:8099
```

## Deploy to GitHub Pages

This folder is self-contained and can be served from a repo root. Two options:

1. **Dedicated repo (simplest):** push the *contents of this folder* to a new repo,
   then Settings → Pages → Source: `Deploy from a branch` → `main` / `/ (root)`.
2. **This monorepo:** the included GitHub Actions workflow
   (`../.github/workflows/deploy-pages.yml`) publishes the `site/` folder. Enable
   Settings → Pages → Source: `GitHub Actions`.
