# Changelog

Use compact entries:

```md
## YYYY-MM-DD — Short Title

- Changed: ...
- Verified: ...
- Next: ...
```

## 2026-05-09 — Planning Phase

- Changed: Populated vault docs (product, frontend, backend, api, data-model, security, deployment, code-map, quick-start) for NOMOKH knife e-commerce + auction project.
- Verified: User requirements captured (1C import, Vue/Nuxt, GSAP, RF legal, auction v2).
- Next: Initialize repo, install Nuxt + Prisma + Tailwind, create first migration, build catalog vertical slice.

## 2026-05-09 — Vault State Correction

- Changed: Updated `QUICK_START.md` current state and next tasks to reflect existing MVP scaffold.
- Verified: Repo contains Nuxt app, pages/components, Pinia stores, Nitro API routes, Prisma, Docker/Nginx, docs, and tests.
- Next: Run install/test/build/local smoke checks and review MVP gaps.

## 2026-05-09 — Vault Style Rule

- Changed: Added `vault/AGENTS.md` to require caveman-full style for vault edits.
- Verified: Vault rule uses English, terse bullets.
- Next: Keep vault docs compact during future updates.

## 2026-05-09 — Full Audit

- Changed: Audited frontend, backend, Prisma, deploy, docs, tests.
- Verified: `pnpm build` passes; `vue-tsc --noEmit` fails; `pnpm test` passes after `prisma:generate`; `pnpm audit` blocked by missing lockfile.
- Found: Critical payment webhook/auth secrets/OTP/order-payment issues; major cart/stock/deploy/typecheck/docs gaps.
- Next: Fix critical security + checkout/order flow first.

## 2026-05-10 — Audit Fix Pass 1

- Changed: Added secret fail-fast, OTP verify throttling, YooKassa verify boundary, safer order/payment flow, cart stock caps, checkout auth, lockfile, patched deps, Docker Prisma generate.
- Changed: Removed duplicate ProductCard, fixed typecheck issues, added helper tests, added `typecheck` script.
- Verified: `pnpm test`, `pnpm typecheck`, `pnpm audit --audit-level low`, `pnpm build`, Prisma validate pass.
- Next: DB smoke, integration tests, TLS/prod compose, legal pages, admin route auth.

## 2026-05-10 — Audit Fix Review Pass

- Changed: Fixed review findings: refresh token type/secret checks, atomic Redis OTP consume, SMS prod fail-closed, idempotent cancel webhook stock restore, prod Prisma CLI deps.
- Verified: `pnpm test`, `pnpm typecheck`, `pnpm audit --audit-level low`, `pnpm build`, Prisma validate pass.
- Next: DB-backed checkout/webhook smoke; add integration tests.

## 2026-05-10 — Prod Hardening Pass

- Changed: Added `docker-compose.prod.yml` + Caddy TLS config, no public DB/Redis ports.
- Changed: Added `/offer`, footer link, deploy docs, smoke checklist, extra payment/secret regression tests.
- Verified: `pnpm test` 12 pass, `pnpm typecheck`, `pnpm audit --audit-level low`, Prisma validate, `pnpm build` pass.
- Next: Run DB-backed smoke with real Postgres/Redis; replace legal templates.

## 2026-05-10 — Brand UI Pass

- Changed: Applied NOMOKH premium dark tokens, hero/card/PDP/checkout trust copy, reduced-motion guard, brand contract test.
- Verified: `corepack pnpm test` 14 pass, `corepack pnpm typecheck`, `corepack pnpm build` pass.
- Found: Dependency drift before Nuxt 4 migration.
- Next: Resolve Nuxt version drift; DB-backed smoke.

## 2026-05-10 — Nuxt 4 Migration

- Changed: Migrated deps/lock to Nuxt `4.4.4`, `@nuxt/image` `2.0.0`, Tailwind module `6.14.0`, `h3` `1.15.11`.
- Changed: Fixed analytics script insert typing exposed by Nuxt 4 typecheck.
- Verified: `corepack pnpm install --frozen-lockfile`, `corepack pnpm test` 14 pass, `corepack pnpm typecheck`, `corepack pnpm build` pass; build prints Nuxt `4.4.4`.
- Next: DB-backed smoke.
