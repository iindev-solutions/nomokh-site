# Audit Fixes Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove critical production blockers and make MVP safer, testable, and deployable.

**Architecture:** Fix security and money-flow first. Keep changes minimal. Add server helpers for env validation, delivery pricing, OTP attempts, and payment verification boundaries.

**Tech Stack:** Nuxt 3, Vue 3, Pinia, Nitro/H3, Prisma, PostgreSQL, Redis, Vitest, Docker.

---

## Chunk 1: Critical Security + Payment Flow

### Task 1: Runtime Secrets

**Files:**
- Modify: `server/utils/auth.ts`
- Modify: `server/utils/security.ts`
- Test: `tests/unit/security.test.ts`

- [ ] Add prod-only hard failure for missing/short `JWT_SECRET` and `REFRESH_TOKEN_SECRET`.
- [ ] Keep dev fallback only outside production.
- [ ] Add tests for production failure and dev fallback.

### Task 2: OTP Brute Force

**Files:**
- Modify: `server/api/v1/auth/otp/send.post.ts`
- Modify: `server/api/v1/auth/otp/verify.post.ts`
- Modify: `server/utils/auth.ts`
- Test: `tests/unit/auth-otp.test.ts`

- [ ] Use `generateOtp()` for production OTP.
- [ ] Add verify IP+phone rate limits.
- [ ] Track OTP attempts and lock after 5 failures.
- [ ] Preserve current dev code behavior.

### Task 3: YooKassa Webhook Boundary

**Files:**
- Modify: `server/utils/yookassa.ts`
- Modify: `server/api/v1/payments/webhook/yookassa.post.ts`
- Test: `tests/unit/yookassa-webhook.test.ts`

- [ ] Add helper to fetch payment from YooKassa by id.
- [ ] Reject webhook in production when payment cannot be verified.
- [ ] Compare order id, amount, currency, status, and existing external id.
- [ ] Enforce idempotent state transitions.
- [ ] Keep explicit demo/stub mode safe.

### Task 4: Order Creation Integrity

**Files:**
- Modify: `server/api/v1/orders/index.post.ts`
- Create/Modify: `server/utils/delivery.ts`
- Test: `tests/unit/order-flow.test.ts`

- [ ] Centralize delivery pricing.
- [ ] Generate collision-safe order numbers.
- [ ] Avoid stock decrement/cart clear if payment creation fails.
- [ ] Reprice cart items at checkout from current product price.
- [ ] Store payment external id only after payment create succeeds.

## Chunk 2: Cart/Auth/Stock Integrity

### Task 5: Cart Stock Limits

**Files:**
- Modify: `server/api/v1/cart/items/index.post.ts`
- Modify: `server/api/v1/cart/items/[id].patch.ts`
- Test: `tests/unit/cart.test.ts`

- [ ] Enforce final quantity <= stock and <= 99 on add/patch.
- [ ] Return 409 on insufficient stock.

### Task 6: Client Cart + Checkout Auth

**Files:**
- Modify: `stores/cart.ts`
- Modify: `stores/auth.ts`
- Modify: `pages/checkout.vue`

- [ ] Clear local cart when server cart empty.
- [ ] Roll back/sync on cart API failure.
- [ ] Guard auth hydration localStorage parse.
- [ ] Use `apiFetch` for checkout so auth header is sent.

### Task 7: Cancel Restores Stock

**Files:**
- Modify: `server/api/v1/orders/[id]/cancel.post.ts`
- Test: `tests/unit/order-cancel.test.ts`

- [ ] Cancel in transaction.
- [ ] Restore product stock for cancellable unpaid orders.

## Chunk 3: Deploy + Typecheck Hygiene

### Task 8: Docker + Lockfile

**Files:**
- Modify: `Dockerfile`
- Create: `pnpm-lock.yaml`

- [ ] Remove mutable install fallback.
- [ ] Ensure runner has generated Prisma client.
- [ ] Generate lockfile with `corepack pnpm install`.

### Task 9: Typecheck + Duplicates

**Files:**
- Modify/Delete: `components/product/ProductCard.vue`
- Modify: `components/home/FeaturedCategories.vue`
- Modify: `composables/useAnalytics.ts`
- Modify: `server/utils/validation.ts`

- [ ] Remove/rename duplicate ProductCard.
- [ ] Fix wrapped API data typing.
- [ ] Fix analytics TypeScript errors.
- [ ] Rename `readValidatedBody` helper to avoid H3 auto-import conflict.

## Chunk 4: Verification + Vault

### Task 10: Verification

**Files:**
- Modify: `package.json` if typecheck script added.
- Modify: `vault/logs/changelog.md`
- Modify: `vault/QUICK_START.md` if state changes.

- [ ] Run `corepack pnpm prisma:generate`.
- [ ] Run `corepack pnpm test`.
- [ ] Run `corepack pnpm exec vue-tsc --noEmit`.
- [ ] Run `corepack pnpm build`.
- [ ] Run `corepack pnpm audit --audit-level moderate` after lockfile exists.
- [ ] Update vault in terse English.

No git commits unless user explicitly asks.
