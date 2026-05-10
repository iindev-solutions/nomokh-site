# Архитектура

## Stack

- Nuxt 3 + Vue 3 + Pinia + Tailwind + GSAP.
- Nitro/H3 server routes в `server/api/v1`.
- Prisma ORM + PostgreSQL 15.
- Redis для OTP/rate limits/cache/auction locks.
- Docker Compose: web, db, redis, nginx.

## Почему backend внутри Nuxt

Nitro дает Node server после `nuxt build`, поэтому один контейнер может отдавать и страницы, и API. Для MVP это быстрее, дешевле и проще на VPS. Отдельный worker стоит добавить позже для тяжелого импорта, уведомлений, аукциона и регулярных задач.

## Масштабирование каталога

Для тысяч ножей используются server-side фильтры, пагинация и индексы в Prisma/PostgreSQL: `categoryId`, `steel`, `handleMaterial`, `price`, `isActive/isAuction`.

## Границы MVP

В MVP не делаем marketplace, мобильное приложение, мультиязычность, сложный realtime-аукцион, self-hosted observability. Закладываем точки расширения, но не перегружаем первый запуск.
