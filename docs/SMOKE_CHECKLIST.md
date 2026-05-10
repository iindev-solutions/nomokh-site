# NOMOKH — smoke checklist

Use after deploy or before demo.

## Local DB Smoke

```bash
corepack pnpm install
docker compose up -d db redis
corepack pnpm prisma:deploy
corepack pnpm db:seed
corepack pnpm dev
```

Check:

1. `curl -f http://localhost:3000/api/health` returns `success: true` and `database: ok`.
2. `/` loads hero, categories, products.
3. `/catalog/yakutskie-nozhi` filters and pagination work.
4. Product page adds item to cart.
5. Cart quantity cannot exceed stock.
6. Login dev OTP returns `111111`; account pages require login.
7. Checkout creates order and clears cart.
8. `/privacy` and `/offer` load.

## Production Smoke

```bash
docker compose -f docker-compose.prod.yml up -d --build
docker compose -f docker-compose.prod.yml exec web pnpm prisma:deploy
curl -f https://$SITE_DOMAIN/api/health
```

Check:

1. Only ports `80`, `443`, `22` exposed publicly.
2. HTTPS certificate issued by Caddy.
3. `NUXT_PUBLIC_DEMO_MODE=false` and real SMS/YooKassa env are set.
4. Placeholder secrets rejected on startup.
5. YooKassa test payment webhook marks only matching order paid.
6. Canceled YooKassa webhook does not double-restore stock on duplicate delivery.

## Required Before Real Sales

1. Lawyer-approved privacy policy and public offer.
2. Seller requisites and return policy published.
3. TLS enabled and HSTS decision made.
4. DB backups tested.
5. YooKassa/SMS provider credentials tested.
