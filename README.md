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
main.js         Mobile nav toggle + contact-form submit (posts to Formspree).
assets/         Logos (green/white/plum) and studio photography.
fonts/          Afterglow-Regular.ttf (brand display serif).
```

Body/UI type is **Mulish** (Google Fonts); display type is **Afterglow** (bundled).
Icons are inlined **Lucide** SVGs (no runtime CDN dependency).

## Booking & contact

- Every booking button deep-links to the studio's **Vagaro** pages (open in a new tab).
- The contact form posts to [Formspree](https://formspree.io) (form `xnjkenqa`), which
  emails submissions to `sharifa@juststretchitfm.com` — no server required.
  Submitted with a plain `fetch` + `FormData` and only an `Accept: application/json`
  header. Both are CORS-safelisted, so the browser sends the `POST` directly with no
  preflight `OPTIONS` — one less thing to fail. We deliberately do **not** use the
  `@formspree/ajax` CDN library: it would add a runtime CDN dependency and a second
  point of failure.
  Without JS the form still works, degrading to a native POST and Formspree's own
  thank-you page.
  `_gotcha` is Formspree's honeypot: hidden from users, filled by bots, silently dropped.

  **Domain email:** delivery depends on `juststretchitfm.com` having MX records
  (`smtp.google.com`, priority 1) for Google Workspace. Without them the domain cannot
  receive mail and *no* form provider will work, however healthy it looks.

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
