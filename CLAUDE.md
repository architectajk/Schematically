# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Schematically (schematically.org) is a free platform for architects, students, and vendors — engineering calculators, a code/resource library (National Building Code parts, state byelaws), and an asset library, built as a Vite + React 18 single-page app (migrated from Create React App in 2026).

## Commands

```bash
npm start           # Vite dev server on port 3000, auto-opens browser (vite.config.mjs)
npm run build       # production build (vite build) — outputs to build/ (not dist/), so the FTP deploy keeps working
npm run preview     # preview the production build locally
```

- There is no test runner and no lint script configured — `@testing-library/*` packages remain in `dependencies` from the CRA era, but Jest/Vitest and `eslintConfig` were dropped in the Vite migration. Don't assume `npm test` works.
- Build/deploy: push to `main` triggers `.github/workflows/deploy.yaml` (GitHub Actions → `npm run build` → FTP upload of `build/` to Hostinger `/public_html/`).
- Environment variables use Vite conventions: `import.meta.env.VITE_*`, defined in `.env`. Currently used by `src/supabaseClient.js` (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).
- NBC PDFs are served from a stable `/pdfs/` path on the production server (uploaded to Hostinger separately — there is no `public/pdfs/` folder in this repo, so those viewers only work on the live site).

## Architecture

**Entry chain:** root `index.html` (Vite entry, loads CDN resources) → `src/index.jsx` → `src/App.jsx` → `src/AppRoutes.jsx`.

- `App.jsx` is the global shell: wraps the tree in `SchematicContextProvider` (single app-wide context) and `MathJaxContext` (from `better-react-mathjax`, used by calculator pages that render formulas), then `BrowserRouter`. `Navbar`, `Alert`, `Breadcrumb`, and `Footer` are rendered persistently around `AppRoutes`, so they are not part of the route tree.
- `SchematicContext` (`src/context/Schematic/SchematicContextProvider.jsx`) holds exactly two pieces of state: `mode` (`'dark'`/`'light'`, toggled via `toggleMode`) and `alert` (`{msg, type}`, shown via `showAlert(message, type)` and auto-dismissed after 3s). `toggleMode` also directly sets `document.body.style.backgroundColor`. This is the only global state in the app — there is no Redux/Zustand.
- `AppRoutes.jsx` defines one nested `<Routes>` block per top-level site section — `ToolRoutes` (`/tools/*`), `ResourcesRoutes` (`/resources/*`), `AssetsRoutes` (`/assets/*`) — each mirroring the corresponding `src/pages/<Section>/` folder. Only the two section landing pages (`Tools`, `Resources`) are `lazy()`-loaded, each wrapped through a shared `SuspenseWithSpinners` helper and an artificial `wait(1000)` delay before the dynamic `import()`; every other page (each tool, each NBC part, etc.) is imported eagerly at the top of the file.
- Page components live under `src/pages/<Section>/...` and mirror the route structure exactly — when adding a route, add the page in the matching subfolder and wire it into the corresponding `*Routes` block in `AppRoutes.jsx`.
- Multi-file tools bundle their reference data alongside the component in their own folder, e.g. `src/pages/Tools/MetalCalc/` contains `MetalCalc.jsx` plus one JSON file per Indian Standard steel section table (`ISWB.json`, `ISHB.json`, `ISCircularHollowSections.json`, etc.) that the component imports directly for lookup calculations.
- `src/components/` holds shared, flat (no subfolders) cross-page UI: `Navbar`, `Footer`, `Breadcrumb`, `Alert`, `Accordion`, `Spinners`, `PDFViewer`, `DotsBackground`. There is no `hooks/`, `utils/`, or `services/` layer — logic is colocated inside page components.
- `src/assets/` holds static SVG/PNG/CSS grouped by domain (`CSS/`, `Metal/`, `NBC/`, `SanReq/`); some pages instead keep their CSS colocated in their own `pages/.../*.css` (both patterns exist — check the page's own folder before assuming assets live centrally).

### Styling

Styling is layered, in this priority order — match whichever pattern the file you're editing already uses:
1. **Bootstrap 5.3.1**, loaded via CDN `<link>`/`<script>` tags in the root `index.html` (not an npm dependency) — most layout/utility classes (`navbar`, `offcanvas`, `container-fluid`, `text-bg-*`, grid/flex utilities) come from here. `data-bs-theme` / `bg-dark`/`bg-light` classes are driven off `mode` from `SchematicContext`.
2. **Per-page/-component CSS or SCSS files**, imported directly into the component (e.g. `Navbar.jsx` imports `../assets/CSS/Navbar.css`).
3. **`styled-components`**, used selectively for components needing dynamic prop-driven styles (e.g. `Accordion.jsx` uses a `StyledWrapper` styled.div keyed off the `mode` prop).

Dark/light `mode` is threaded through many components as a prop or via `useContext(SchematicContext)` and toggled by the switch in `Navbar`; UI changes should respect both modes.

Other CDN-loaded resources declared in the root `index.html`: KaTeX CSS (math rendering) and Google's `<model-viewer>` web component (3D model embeds) — neither is an npm dependency, so don't add them to `package.json`.

## Working conventions for this repo

- This is a live, working site — do not refactor folder structure, rename files, move components, change the routing structure, or change the Context API as a side effect of an unrelated task. Only touch what's needed for the requested change.
- Do not introduce Next.js, Tailwind, TypeScript, Redux, Zustand, or a component library (MUI/Chakra/Ant) — the stack is Vite + React 18 + Bootstrap + Sass/CSS + styled-components, and stays that way unless explicitly asked otherwise. `vite-plugin-svgr` is already configured if you need SVGs as React components.
- Before adding a new component, check `src/components/` and the relevant `src/pages/<Section>/` folder for an existing one to reuse.
- Before adding a new asset, check `src/assets/` and the page's own folder — don't duplicate existing images, and don't leave orphaned assets behind after a change (confirm no remaining references before deleting one).
- Implement and verify one feature/screen at a time rather than editing many pages in a single pass; after a change, confirm the app still compiles, existing routes/pages/calculators still work, and both Navbar/Footer and dark/light mode are unaffected.
