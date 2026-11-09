# V-Control Docs

The official documentation site for [V-Control](https://github.com/jevonsflash/VControl), an out-of-the-box .NET MAUI component library. Built with [Docusaurus](https://docusaurus.io/).

---

## Getting Started

Install the [latest versions of Node and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Once npm is installed, run

```
npm install
npm run start
```

The site will launch in development mode. `npm run build` produces a production build in `build/`, and `npm run serve` serves it locally.

---

## Project Layout

- `docs/` — English documentation (default locale), plus `docs/assets/` for images referenced by the docs.
- `i18n/zh/` — Simplified Chinese translations of the docs and UI strings.
- `src/pages/` — the portal homepage (component screenshot gallery).
- `static/` — files served as-is, including `static/img/screenshots/` used by the portal page.
- `scripts/` — maintenance utilities (e.g. `markdown_to_docx.py`).

---
