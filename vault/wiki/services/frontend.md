# Frontend

## Stack

- Nuxt 4.4.4 (SSR/SSG hybrid) — `nuxt.config.ts` with `ssr: true`, route rules for static pages.
- Vue 3 + Composition API + `<script setup lang="ts">`.
- Pinia for global state (cart, auth, filters).
- Tailwind CSS + premium dark tokens (obsidian, graphite, bone, brass, silver, moss).
- GSAP (ScrollTrigger, Flip) for hero + transitions.
- Nuxt Image for responsive/lazy images.
- @nuxtjs/i18n — deferred, only Russian now.

## Routes / Screens

| Route | Mode | Notes |
|-------|------|-------|
| `/` | SSR | Hero + featured + categories. GSAP scroll animations. |
| `/catalog/[slug]` | SSR | Product grid, filters sidebar, pagination. |
| `/product/[id]` | SSR | Product detail, image gallery, specs table, add-to-cart. |
| `/cart` | CSR | Cart items, quantities, promo. |
| `/checkout` | CSR | Stepper: contacts → delivery → payment. Auth wall optional. |
| `/auction` | SSR | List of active lots (v2). |
| `/auction/[id]` | CSR | Lot detail, bid form, real-time timer. |
| `/account/orders` | CSR | Order history. |
| `/account/profile` | CSR | Phone, address book. |
| `/login` | CSR | Phone input → OTP. |

## State

- `useCart()` composable: items[], add, remove, total, persist to `localStorage`.
- `useAuth()` composable: user ref, token, isAuth, logout.
- `useCatalog()` store: filters, pagination, sort, cached in session.
- GSAP animations isolated in `composables/usePageAnimations.ts` — cleanup on unmount.

## Local Commands

```bash
# dev
pnpm dev

# build
pnpm build

# preview
pnpm preview

# lint + type check
pnpm lint
pnpm typecheck
```

## Manual Smoke Check

1. Open `/`. Hero animation plays. Scroll to categories.
2. Click category → catalog loads with filters.
3. Click product → detail page, image loads, add to cart.
4. Cart persists after reload.
5. Checkout → phone OTP → payment widget opens.
6. Mobile: hamburger, cart slide-over.

## Performance Targets

- Lighthouse >= 90 (Performance).
- First Contentful Paint < 1.5s.
- Time to Interactive < 3s.
- GSAP only on visible sections (ScrollTrigger `once: true` where possible).
