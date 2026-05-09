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

- Planning phase. Vault docs populated. No code yet.

## Next Best Tasks

1. Lock stack versions, init monorepo or single repo (`apps/web` + `apps/worker`).
2. Design DB schema, migrate with Prisma ORM.
3. Build vertical slice: category list → product card → cart → checkout stub.
4. Add CommerceML 2 import job for 1C sync.
5. Auth by phone OTP (SMS.ru or WhatsApp Business API).

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
