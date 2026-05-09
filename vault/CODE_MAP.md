# CODE_MAP — NOMOKH

## Root

- `AGENTS.md` — vault-first project rules.
- `README.md` — project overview.
- `vault/` — project memory and source of truth.
- `nuxt.config.ts` — Nuxt configuration.
- `package.json` — pnpm workspace (single app for now).
- `prisma/` — schema, migrations, seed.
- `src/` or repo root for Nuxt: `pages/`, `components/`, `composables/`, `stores/`, `assets/`.
- `server/` — Nitro API routes, middleware, utils, plugins.
- `tests/` — Vitest unit, Playwright e2e.

## Architecture Docs

- `vault/wiki/architecture/product.md` — product purpose, users, boundaries.
- `vault/wiki/architecture/data-model.md` — entities, storage, migrations.
- `vault/wiki/architecture/security.md` — auth, privacy, abuse, secrets.

## Service Docs

- `vault/wiki/services/api.md` — HTTP/API contract.
- `vault/wiki/services/frontend.md` — UI/client behavior.
- `vault/wiki/services/backend.md` — server/runtime behavior.
- `vault/wiki/services/deployment.md` — hosting and release notes.

## Key Directories (planned)

```
├── components/
│   ├── ui/            # base: Button, Input, Modal
│   ├── layout/        # Header, Footer, Nav
│   ├── product/       # ProductCard, ProductGrid, ProductGallery
│   ├── cart/          # CartDrawer, CartItem, CartSummary
│   └── checkout/      # CheckoutSteps, DeliveryForm, PaymentWidget
├── composables/
│   ├── useCart.ts
│   ├── useAuth.ts
│   ├── useCatalog.ts
│   └── useAnimations.ts   # GSAP page transitions
├── stores/
│   └── auth.ts        # Pinia auth store
├── pages/
│   ├── index.vue
│   ├── catalog/
│   │   └── [slug].vue
│   ├── product/
│   │   └── [id].vue
│   ├── cart.vue
│   ├── checkout.vue
│   ├── auction/       # v2
│   └── account/
│       ├── orders.vue
│       └── profile.vue
├── server/
│   ├── api/
│   │   ├── v1/
│   │   │   ├── auth/
│   │   │   ├── products/
│   │   │   ├── categories/
│   │   │   ├── cart/
│   │   │   ├── orders/
│   │   │   ├── payments/
│   │   │   ├── admin/
│   │   │   └── auction/   # v2
│   │   └── health.get.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   └── rateLimit.ts
│   └── utils/
│       ├── prisma.ts
│       ├── redis.ts
│       └── sms.ts
└── tests/
    ├── unit/
    └── e2e/
```

## Key Flows

1. 1C Import: `POST /api/v1/admin/sync/1c` → parse XML → upsert Category/Product → log to SyncLog.
2. Checkout: cart → create Order → ЮKassa payment link → webhook updates order status → SMS notification.
3. Auction (v2): Bid → Redis lock → validate amount > current → insert Bid → broadcast update → timer close resolves winner.
