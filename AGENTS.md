# Agent Notes

## Repo: Two subprojects

| Project | Dir | Stack |
|---------|-----|-------|
| Frontend | `./frontend/` | Nuxt 4.4.8, Vue 3.5, Vue Router 5, TS |
| Backend | PocketBase (Docker) | SQLite, REST API, Admin Panel |

## Frontend (`./frontend/`)

- **Entry:** `pages/index.vue` → `components/App*.vue`
- **Dev:** `npm run dev` from `frontend/` directory (port 3000)
- **Build:** `npm run build`, **Generate:** `npm run generate`, **Preview:** `npm run preview`
- **All styles** in single file: `assets/css/main.css` (~1266 lines) — no modules, no Tailwind
- GSAP + Glide.js loaded via CDN in `nuxt.config.ts` `app.head.script`
- TypeScript enabled via `tsconfig.json` (extends `./.nuxt/tsconfig.json`)
- Auto-generated `.nuxt/` (gitignored) — regen with `npx nuxt prepare`

## Backend (PocketBase)

- **Docker:** `docker compose up -d`
- **Admin:** `http://localhost:8090/_/`
- **API:** `http://localhost:8090/api/`
- **Database:** SQLite at `./data/pb_data/`

## Shared design conventions

- **Container:** `.l-wrapper` — `max-width: 1440px; padding: 0 16px; margin: 0 auto`
- **Font:** Inter from Google Fonts CDN in `<head>`
- **Design tokens** (CSS custom properties):

  | Token | Value |
  |-------|-------|
  | `--color-orange` | `#EF7E31` |
  | `--color-dark` | `#2E2F31` |
  | `--color-gray` | `#A8A8A8` |
  | `--color-light` | `#E4E4E4` |

- **Animations:** GSAP 3 + ScrollTrigger via CDN; all sections use `[data-anim]` with opacity/translateY fade-in

## Sections (in order)

1. Header (fixed, transparent → dark on scroll, burger overlay menu)
2. Hero (full viewport, split dark/orange halves)
3. About (2-col grid, Glide.js slider on right)
4. Features (dark bg, 3 cards)
5. Catalog (orange header, 2-col image grid)
6. Services (orange header, 3-row list with images)
7. Contacts (form + Yandex map)
8. Footer (split dark/light halves, no divider)

## Contacts & Social

- **Phone:** `8 (924) 464-08-88` — links to WhatsApp `wa.me/+79244640888`
- **Social:** YouTube, WhatsApp, Instagram (in footer right half)

## Gotchas

- `.l-wrapper` should never carry utility classes (golden rule)
- Shadow pseudo-elements use `width: 100vw` with `position: absolute` — the parent section must have `overflow: hidden`
- Burger overlay needs `pointer-events: none` when closed, `pointer-events: auto` when open
