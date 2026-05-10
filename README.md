# NOMOKH — MVP маркетплейса якутских ножей

NOMOKH — премиальная e-commerce платформа для продажи якутских ножей, клинков и аксессуаров. Архив собран как **single repo**: фронтенд, backend API, Prisma-схема, Docker, Nginx и документы находятся в одном проекте.

## Что внутри

- Nuxt 3 SSR/CSR приложение: главная, каталог, карточка товара, корзина, checkout, login OTP, privacy, auction v2.
- Backend внутри `server/` на Nitro/H3: products, categories, cart, orders, auth OTP, admin 1C sync, YooKassa webhook, auctions.
- Prisma ORM + PostgreSQL 15: пользователи, категории, товары, изображения, корзина, заказы, аукционы, sync logs.
- Redis-ready слой: OTP и rate limits.
- Docker Compose: `web`, `db`, `redis`, `nginx`.
- Seed-данные: категории, демо-ножи, админ.
- CommerceML 2 importer-заготовка для 1C.
- Yandex Metrica после cookie consent.
- Документы: `docs/ROADMAP.md`, `docs/DEPLOY_VPS.md`, `docs/PITCH.md`, `docs/SECURITY_CHECKLIST.md`.

## Главный архитектурный ответ

Да, **сервер можно держать прямо внутри Nuxt в папке `server/`**. Для MVP это правильнее: один репозиторий, один деплой, один Docker image. Когда появятся тяжелые фоновые задачи — массовый импорт 1C, уведомления, аукционные события — можно вынести worker отдельно. Сейчас отдельный backend не нужен.

## Запуск локально

```bash
cp .env.example .env
corepack enable
pnpm install

docker compose up -d db redis
pnpm prisma:deploy
pnpm db:seed
pnpm dev
```

Открыть: `http://localhost:3000`.

## Запуск на VPS

```bash
git clone <repo-url> nomokh
cd nomokh
cp .env.example .env
# заполнить secrets, домен, платежи, SMS, доставку
docker compose up -d --build
docker compose exec web pnpm db:seed
curl http://localhost/api/health
```

Подробно: `docs/DEPLOY_VPS.md`.

## Демо-доступ

- админ телефон: `+79990000000`
- OTP в dev возвращается в ответе `/api/v1/auth/otp/send`
- admin sync можно дернуть через header `x-admin-token: <ADMIN_API_TOKEN>`

Перед production поставить `NUXT_PUBLIC_DEMO_MODE=false`.

## Структура

```text
assets/            Tailwind/global styles
components/        UI
composables/       api/analytics helpers
docs/              roadmap/deploy/pitch/security
nginx/             reverse proxy
pages/             Nuxt routes
prisma/            schema/migration/seed
public/demo/       SVG demo images
server/            Nitro backend API + utils
stores/            Pinia auth/cart/catalog
```
