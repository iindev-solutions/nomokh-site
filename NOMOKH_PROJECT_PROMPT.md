# NOMOKH — Полный промт для аналитики и реализации проекта

> Этот документ содержит полное техническое задание и контекст для разработки маркетплейса NOMOKH.

---

## 1. Контекст и продукт

**NOMOKH** (якут. номох — легенда, сказание) — это premium e-commerce платформа для продажи ножей и клинков. Каждый нож рассказывает свою историю как легенду. Сайт минималистичный, быстрый, с плавными анимациями.

**Текущее состояние:** планирование. Репозиторий пуст, vault-документы наполнены.

**Версия продукта:** MVP с каталогом + корзина + оформление заказа. Аукцион — v2 (позже).

---

## 2. Бизнес-требования

### Пользователи
- **Покупатель** — ищет нож по категории, сравнивает, добавляет в корзину, оформляет заказ.
- **Админ/владелец** — загружает товары через 1С или вручную, управляет заказами.
- **Участник аукциона** — v2.

### Основной флоу
1. Лендинг → hero с анимацией (GSAP), популярные категории.
2. Каталог → фильтры (сталь, рукоять, цена, назначение).
3. Карточка товара → фото, описание, характеристики, "В корзину".
4. Корзина → список, количество, промокод, доставка.
5. Оформление → контакты, адрес, выбор доставки (СДЭК/Почта/самовывоз), оплата (ЮKassa).
6. Подтверждение заказа → WhatsApp/SMS уведомление.

### In Scope
- Каталог с категориями и фильтрами
- Корзина и оформление заказа
- Интеграция оплаты (ЮKassa / Сбер / Тинькофф)
- Интеграция доставки (СДЭК API, Почта РФ)
- Импорт товаров из 1С по CommerceML 2
- Админ-API для заказов и товаров
- Аукцион (v2): лоты, ставки, таймер, победитель

### Out Of Scope
- Маркетплейс с несколькими продавцами (пока один владелец)
- Мобильное приложение (только PWA)
- Мультиязычность (только русский, якутский опционально позже)

### Hard Boundaries
- Никогда не хранить данные банковских карт. Только токены платежных провайдеров.
- Все персональные данные — шифрование AES-256 at rest, TLS in transit. Соответствие 152-ФЗ.
- 1С sync только по явному запросу админа или по расписанию.
- Аукционные ставки — idempotent, optimistic locking на цене.

---

## 3. Технический стек

### Frontend
- Nuxt 3 (SSR/SSG hybrid) — `ssr: true`, route rules для статических страниц
- Vue 3 + Composition API + `<script setup lang="ts">`
- Pinia для глобального состояния (корзина, auth, фильтры)
- Tailwind CSS + custom design tokens (colors: steel, forge-orange, obsidian)
- GSAP (ScrollTrigger, Flip) для hero + transitions
- Nuxt Image для responsive/lazy images
- @nuxtjs/i18n — отложено, только русский сейчас

### Backend
- Nuxt Nitro server (H3) — API routes в `server/`
- Prisma ORM + PostgreSQL 15
- Redis (ioredis): сессии, rate limits, кэш, auction locks
- Auth: custom JWT (access + refresh) в httpOnly cookie. Телефон OTP через SMS.ru или WhatsApp Business API.
- 1С Sync: фоновый endpoint, парсит CommerceML 2 XML
- Платежи: ЮKassa SDK / REST (основной). Fallback: Tinkoff API, Sber API.
- Доставка: СДЭК API v2, Почта РФ API.
- Файлы: S3-compatible (Selectel/Yandex/Ozon S3) для фото товаров.

### Тесты и DevOps
- Unit: Vitest
- E2E: Playwright
- Docker Compose: web (Nuxt), db (PostgreSQL), redis, nginx
- Деплой: VPS / Yandex Cloud / Selectel

---

## 4. Модель данных

### User
- id (UUID PK)
- phone (unique, indexed)
- name, email (optional)
- role: USER | ADMIN
- createdAt, updatedAt

### Category
- id (UUID PK)
- slug (unique), name, description
- parentId (self-relation)
- imageUrl, sortOrder
- externalId (1С Ид)

### Product
- id (UUID PK)
- slug (unique), name, description, story (rich text — легенда ножа)
- price (Decimal), oldPrice, currency
- stockQty, weight, length, bladeLength
- steel, handleMaterial, bolster, sheath
- categoryId (FK)
- externalId (1С Ид)
- isActive, isAuction (v2 flag)
- createdAt, updatedAt

### ProductImage
- id (UUID PK)
- productId (FK)
- url, sortOrder, alt

### Cart / CartItem
- cartId (UUID PK or userId FK)
- userId (nullable, indexed)
- items: productId, quantity, priceSnapshot
- expiresAt (for anonymous)

### Order
- id (UUID PK), orderNumber (human-readable)
- userId (FK, nullable for guest checkout)
- status: DRAFT | CONFIRMED | PAID | SHIPPED | DELIVERED | CANCELLED | REFUNDED
- totalAmount, deliveryAmount, discountAmount
- deliveryType: CDEK | POST | PICKUP
- deliveryAddress (JSON), contactPhone, contactName
- paymentType: YOOKASSA | SBER | TINKOFF | CASH
- paymentStatus, paymentExternalId
- createdAt, updatedAt

### OrderItem
- id (UUID PK)
- orderId, productId, nameSnapshot, priceSnapshot, quantity

### AuctionLot (v2)
- id (UUID PK)
- productId (FK)
- startPrice, reservePrice, currentPrice
- startAt, endAt
- status: PENDING | ACTIVE | CLOSED | CANCELLED
- winnerUserId (nullable)

### Bid (v2)
- id (UUID PK)
- lotId, userId
- amount
- createdAt

### SyncLog
- id (UUID PK)
- source: MANUAL | CRON
- type: IMPORT_1C
- status: SUCCESS | PARTIAL | FAILED
- message, rowsProcessed, errorsJson
- createdAt

### Retention / Backup
- PostgreSQL daily backups to S3, retention 30 дней
- Order data — 3 года (налоговое законодательство РФ)
- Anonymous cart — удаляется через 30 дней
- SyncLog — 90 дней

---

## 5. API контракт

Все маршруты с префиксом `/api/v1`.

### Auth — Phone OTP
1. `POST /api/v1/auth/otp/send` — body `{ phone }` → отправляет SMS/WhatsApp код.
2. `POST /api/v1/auth/otp/verify` — body `{ phone, code }` → возвращает accessToken + устанавливает refresh httpOnly cookie.
3. `POST /api/v1/auth/refresh` — cookie-based, возвращает новый accessToken.
4. `POST /api/v1/auth/logout` — очищает cookie.
5. Auth header: `Authorization: Bearer <accessToken>`.

### Products
- `GET /products` — query: `categorySlug`, `minPrice`, `maxPrice`, `steel`, `handleMaterial`, `sort`, `page`, `limit`. Возвращает paginated list с facets.
- `GET /products/:id` — полная деталь товара, related products.

### Categories
- `GET /categories` — дерево категорий.
- `GET /categories/:slug` — деталь категории + breadcrumbs.

### Cart
- `GET /cart` — текущая серверная корзина (merged с local при логине).
- `POST /cart/items` — добавить `{ productId, quantity }`.
- `PATCH /cart/items/:id` — обновить количество.
- `DELETE /cart/items/:id` — удалить.

### Orders
- `POST /orders` — создать из корзины. Body: `deliveryType`, `address`, `contactPhone`, `paymentType`. Возвращает order с payment URL.
- `GET /orders` — история заказов пользователя.
- `GET /orders/:id` — деталь заказа.
- `POST /orders/:id/cancel` — отмена до оплаты.

### Payments
- `POST /payments/webhook/yookassa` — webhook от провайдера. Idempotent по `paymentId`.

### 1С Sync (admin only)
- `POST /admin/sync/1c` — ручной запуск sync. Принимает опциональный `xmlUrl` или читает из конфига.
- `GET /admin/sync/logs` — история синхронизаций.

### Auction (v2)
- `GET /auctions` — активные лоты, query: `status=active`.
- `GET /auctions/:id` — деталь лота, текущая ставка, история.
- `POST /auctions/:id/bids` — сделать ставку. Body `{ amount }`. Возвращает новую ставку или ошибку.

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "...",
    "details": {}
  }
}
```
HTTP codes: 400 validation, 401 unauthorized, 403 forbidden, 404 not found, 409 conflict (auction), 429 rate limit, 500 internal.

---

## 6. Фронтенд — роуты и состояние

### Роуты
| Роут | Режим | Описание |
|------|-------|----------|
| `/` | SSR | Hero + featured + categories. GSAP scroll animations. |
| `/catalog/[slug]` | SSR | Сетка товаров, sidebar фильтров, pagination. |
| `/product/[id]` | SSR | Деталь товара, галерея, specs, add-to-cart. |
| `/cart` | CSR | Список товаров, количество, промокод. |
| `/checkout` | CSR | Stepper: контакты → доставка → оплата. Auth wall опционально. |
| `/auction` | SSR | Список активных лотов (v2). |
| `/auction/[id]` | CSR | Деталь лота, форма ставки, таймер. |
| `/account/orders` | CSR | История заказов. |
| `/account/profile` | CSR | Телефон, адресная книга. |
| `/login` | CSR | Ввод телефона → OTP. |

### State / Composables
- `useCart()` — items[], add, remove, total, persist в `localStorage`.
- `useAuth()` — user ref, token, isAuth, logout.
- `useCatalog()` — filters, pagination, sort, cached в session.
- `useAnimations()` — GSAP анимации, cleanup on unmount.

### Performance Targets
- Lighthouse >= 90 (Performance)
- First Contentful Paint < 1.5s
- Time to Interactive < 3s
- GSAP только на видимых секциях (ScrollTrigger `once: true` где возможно)

---

## 7. Безопасность и соответствие

### Auth
- JWT access token (15 min) + refresh token (7 days, httpOnly cookie).
- Phone OTP: 6-значный код, expires 5 min, rate limit 3 попытки на 15 min на телефон.
- Admin routes защищены middleware `role === ADMIN`.
- Без паролей — только passwordless OTP.

### 152-ФЗ
- Баннер согласия перед любым трекингом (cookies, метрики).
- Страница privacy policy обязательна до запуска.
- Уведомление об обработке ПДн на регистрации/чекауте.
- Пользователь может запросить экспорт и удаление данных.
- Телефоны хэшируются в логах.
- ПДн не передаются третьим лицам, кроме: платежный провайдер, доставщик, SMS-шлюз.

### Secrets
- Никогда не коммитить `.env`, токены, credentials, database dumps, приватные ключи.
- Production secrets в Docker secrets или env file с правами 600.
- `JWT_SECRET` минимум 32 bytes random.

### Rate Limits (Redis-backed)
- OTP send: 3 на 15 min на телефон.
- Login attempts: 5 на 5 min на IP.
- API general: 100 на min на IP.
- Auction bids: 10 на min на пользователя на лот.
- DDoS shield: Cloudflare или Nginx `limit_req`.

### Операционные риски
- Payment webhook replay attacks — проверка signature (ЮKassa_hmac), idempotent по `paymentId`.
- 1C XML bomb / XXE — отключить DTD в XML парсере (`processEntities: false`).
- File upload — только изображения (jpg/png/webp), max 5MB.
- SQL injection — Prisma ORM защищает.
- XSS — Nuxt auto-escapes templates; никогда `v-html` с пользовательским контентом.

---

## 8. Деплой

### Target
- VPS / cloud VM (Yandex Cloud / Selectel / Timeweb) с Docker Compose.
- Или managed container platform + static на Object Storage + CDN.
- Домен: nomokh.ru.

### Docker Compose стек
- `web` — Nuxt node server
- `db` — PostgreSQL
- `redis` — Redis
- `nginx` — reverse proxy + static

### Release Steps
1. Version bump + tag.
2. `docker build -t nomokh-web .`
3. Push в registry.
4. SSH на сервер, `docker-compose pull && docker-compose up -d`.
5. `npx prisma migrate deploy` внутри контейнера.
6. Verify health endpoint `/api/health`.

### Rollback
- Сохранять предыдущий image tag. `docker-compose up -d` с предыдущим тегом при failed health check.
- DB rollback: tested `down` migration ready для критических деплоев.

### Monitoring
- Uptime: UptimeRobot / Yandex Monitoring.
- Errors: Sentry или self-hosted GlitchTip.
- Logs: vector → ClickHouse или Loki (опционально, можно отложить).

---

## 9. Что нужно сделать сейчас

1. **Lock stack versions**, init monorepo или single repo (`apps/web` + `apps/worker`).
2. **Design DB schema**, migrate с Prisma ORM.
3. **Build vertical slice**: category list → product card → cart → checkout stub.
4. **Add CommerceML 2 import job** для 1С sync.
5. **Auth by phone OTP** (SMS.ru или WhatsApp Business API).
6. **Настроить деплой**: Docker Compose, Nginx, SSL.

---

## 10. Vault Links (внутренние документы проекта)

- `vault/QUICK_START.md` — текущее состояние и next tasks
- `vault/CODE_MAP.md` — структура директорий
- `vault/wiki/architecture/product.md` — product purpose, users, boundaries
- `vault/wiki/architecture/data-model.md` — entities, storage, migrations
- `vault/wiki/architecture/security.md` — auth, privacy, abuse, secrets
- `vault/wiki/services/api.md` — HTTP/API contract
- `vault/wiki/services/frontend.md` — UI/client behavior
- `vault/wiki/services/backend.md` — server/runtime behavior
- `vault/wiki/services/deployment.md` — hosting and release notes
