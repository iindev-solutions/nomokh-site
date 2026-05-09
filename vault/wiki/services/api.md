# API

## Base URL

`/api/v1` — all routes prefixed.

## Auth

- Phone OTP flow:
  1. `POST /api/v1/auth/otp/send` — body `{ phone }` → sends SMS/WhatsApp code.
  2. `POST /api/v1/auth/otp/verify` — body `{ phone, code }` → returns accessToken + sets refresh httpOnly cookie.
- Refresh: `POST /api/v1/auth/refresh` — cookie-based, returns new accessToken.
- Logout: `POST /api/v1/auth/logout` — clears cookie.
- Auth header: `Authorization: Bearer <accessToken>`.

## Endpoints

### Products
- `GET /products` — query: `categorySlug`, `minPrice`, `maxPrice`, `steel`, `handleMaterial`, `sort`, `page`, `limit`. Returns paginated list with facets.
- `GET /products/:id` — full product detail, related products.

### Categories
- `GET /categories` — tree structure.
- `GET /categories/:slug` — category detail + breadcrumbs.

### Cart
- `GET /cart` — returns current server cart (merged with local on login).
- `POST /cart/items` — add item `{ productId, quantity }`.
- `PATCH /cart/items/:id` — update quantity.
- `DELETE /cart/items/:id` — remove item.

### Orders
- `POST /orders` — create from cart. Body: `deliveryType`, `address`, `contactPhone`, `paymentType`. Returns order with payment URL.
- `GET /orders` — user order history.
- `GET /orders/:id` — order detail.
- `POST /orders/:id/cancel` — cancel before payment.

### Payments
- `POST /payments/webhook/yookassa` — provider webhook. Idempotent by `paymentId`.

### 1C Sync (admin only)
- `POST /admin/sync/1c` — trigger manual sync. Accepts optional `xmlUrl` or reads from configured source.
- `GET /admin/sync/logs` — sync history.

### Auction (v2)
- `GET /auctions` — active lots, query: `status=active`.
- `GET /auctions/:id` — lot detail, current bid, bid history.
- `POST /auctions/:id/bids` — place bid. Body `{ amount }`. Returns new bid or error if outbid/closed.

## Error Behavior

- Standard JSON: `{ success: false, error: { code, message, details? } }`.
- HTTP codes: 400 validation, 401 unauthorized, 403 forbidden, 404 not found, 409 conflict (auction bid), 429 rate limit, 500 internal.
