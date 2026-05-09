# Security

## Auth

- JWT access token (short-lived, 15 min) + refresh token (7 days, httpOnly cookie).
- Phone OTP: 6-digit code, expires 5 min, rate limit 3 attempts per 15 min per phone.
- Admin routes protected by `role === ADMIN` middleware.
- No password storage — passwordless OTP only.

## Privacy (152-FЗ compliance)

- Consent banner before any tracking (cookies, metrics).
- Privacy policy page required before launch.
- Personal data processing notice on registration/checkout.
- User can request data export and deletion (API + admin action).
- Phone numbers hashed in logs if logged at all.
- No sharing PII with third parties except: payment provider, delivery carrier, SMS gateway — only data required by transaction.

## Secrets

- Never commit `.env`, tokens, credentials, database dumps, or private keys.
- Production secrets in Docker secrets or env file with 600 permissions.
- `JWT_SECRET` minimum 32 bytes random.

## Abuse / Rate Limits

- Redis-backed rate limiting:
  - OTP send: 3 per 15 min per phone.
  - Login attempts: 5 per 5 min per IP.
  - API general: 100 per min per IP.
  - Auction bids: 10 per min per user per lot.
- Cloudflare or Nginx `limit_req` for DDoS shield.

## Operational Risks

- Payment webhook replay attacks — verify signature (ЮKassa_hmac), idempotent by `paymentId`.
- 1C XML bomb / XXE — disable DTD in XML parser (`processEntities: false`).
- File upload — restrict to images only (jpg/png/webp), max 5MB, scan via ClamAV or similar if possible.
- SQL injection — Prisma ORM prevents raw queries unless explicitly reviewed.
- XSS — Nuxt auto-escapes templates; never use `v-html` with user content.
