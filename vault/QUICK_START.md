# QUICK_START — NOMOKH

Legend (nomokh) made steel. Yakut knife e-commerce + future auction.

## Now

- Product: NOMOKH — premium knife marketplace. Catalog, purchase, auction (v2).
- Public URL: TBD.
- Primary user flow: browse catalog → product page → cart/checkout → order confirmation.
- Hard boundary: RF legal compliance (152-FZ, public offer, payment regs). No payment card storage.

## Stack

- Frontend: Nuxt 3 + Vue 3 + Composition API `<script setup lang="ts">` + GSAP + Pinia + Tailwind.
- Backend: Nuxt Nitro server API + optional worker for 1C sync. Node 20+.
- Database: PostgreSQL 15 + Redis (sessions, cache, rate limits).
- Tests: Vitest (unit), Playwright (e2e).
- Deploy: Docker + VPS / Yandex Cloud / Selectel. Nginx reverse proxy.

## Current State

- MVP scaffold + first audit fix pass done.
- Security improved: webhook verify boundary, prod secret fail-fast, OTP verify limits, no access token localStorage.
- Integrity improved: stock checks, checkout repricing, safer order/payment flow, cancel restores stock.
- Hygiene improved: lockfile, patched deps, typecheck script, Docker Prisma generate, duplicate component removed.
- Prod deploy improved: `docker-compose.prod.yml` + Caddy TLS; DB/Redis not public.
- Legal scaffold: `/privacy` + `/offer`; lawyer review still required.

## Next Best Tasks

1. Run DB-backed smoke using `docs/SMOKE_CHECKLIST.md`.
2. Add integration tests for auth/cart/order/payment webhook.
3. Replace legal templates with lawyer-approved privacy/offer/requisites.
4. Decide guest checkout vs required login.
5. Decide auction scope for v2 vs current demo routes.

## Read Deep Docs Only If Needed

- Code map: `vault/CODE_MAP.md`
- Product/architecture: `vault/wiki/architecture/product.md`
- Data model: `vault/wiki/architecture/data-model.md`
- Security: `vault/wiki/architecture/security.md`
- API: `vault/wiki/services/api.md`
- Frontend: `vault/wiki/services/frontend.md`
- Backend: `vault/wiki/services/backend.md`
- Deploy: `vault/wiki/services/deployment.md`

## End Rule

Meaningful work -> update `vault/logs/changelog.md` terse. Update `QUICK_START.md` if current state/next tasks changed.
