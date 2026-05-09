# Data Model

## Storage

- PostgreSQL 15 via Prisma ORM.
- Redis: sessions, rate limits, cache keys, auction bid locks.
- S3: product images, category images.

## Entities

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
- externalId (1C Ид)

### Product
- id (UUID PK)
- slug (unique), name, description, story (rich text — легенда ножа)
- price (Decimal), oldPrice, currency
- stockQty, weight, length, bladeLength
- steel, handleMaterial, bolster, sheath
- categoryId (FK)
- externalId (1C Ид)
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

## Migrations

- Prisma migrations in `prisma/migrations/`. Commit migration files.
- Seed script: admin user, root categories, sample products.

## Retention / Backup

- PostgreSQL daily backups to S3 (pg_dump). Retention: 30 days.
- Order data retained 3 years (RF tax law).
- Anonymous cart expunge after 30 days.
- SyncLog retained 90 days.
