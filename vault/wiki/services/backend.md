# Backend

## Stack

- Nuxt Nitro server (H3) for API routes. Same repo, `server/` directory.
- ORM: Prisma + PostgreSQL 15.
- Redis: ioredis for sessions (RedisStore), rate limiting, cache, auction locks.
- Auth: custom JWT (access + refresh) stored in httpOnly cookie. Phone OTP via SMS.ru API or WhatsApp Business API.
- 1C Sync: background HTTP endpoint triggered by cron or manual button. Parses CommerceML 2 XML.
- Payments: ЮKassa SDK / REST (primary). Fallback: Tinkoff API, Sber API.
- Delivery: СДЭК API v2, Почта РФ API.
- File storage: S3-compatible (Selectel/Yandex/Ozon S3) for product images.

## Responsibilities

- Product CRUD, category tree, inventory.
- Order lifecycle: draft → confirmed → paid → shipped → delivered / cancelled.
- Cart: server-side merge on auth (anonymous cart → user cart).
- 1C import: read CommerceML 2, upsert products, categories, prices, stock.
- Auction (v2): lot CRUD, bid placement with Redis-based optimistic locking, timer, winner resolution.
- Notifications: SMS/WhatsApp/Email (SMTP or Unisender/SMS.ru).

## Environment

- `DATABASE_URL` — PostgreSQL connection.
- `REDIS_URL` — Redis connection.
- `JWT_SECRET` — strong random string.
- `SMSRU_API_ID` — for OTP.
- `YOOKASSA_SHOP_ID`, `YOOKASSA_SECRET_KEY`.
- `CDEK_ACCOUNT`, `CDEK_PASSWORD`.
- `S3_ENDPOINT`, `S3_KEY`, `S3_SECRET`, `S3_BUCKET`.

## Local Commands

```bash
# db migrate
npx prisma migrate dev

# db seed
npx prisma db seed

# generate client after schema change
npx prisma generate

# run dev with server
pnpm dev
```

## Tests

```bash
# unit (Vitest for server utils)
pnpm test:unit

# e2e (Playwright against local dev server)
pnpm test:e2e
```

## 1C Integration Notes

- CommerceML 2 schema: `import.xml` (classifier + offers). Parse with `fast-xml-parser`.
- Map `Ид` → externalId in DB. Upsert products by externalId.
- Schedule: nightly cron or manual admin trigger.
- Log every sync to `SyncLog` table with status, error message, row counts.
