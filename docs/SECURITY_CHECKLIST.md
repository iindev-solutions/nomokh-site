# Security checklist

- `.env` не коммитить.
- Secrets минимум 32 bytes random.
- OTP: 6 цифр, expires 5 минут, rate limit.
- Refresh token только httpOnly cookie.
- Не хранить банковские карты.
- Webhook оплаты обрабатывать идемпотентно по `paymentExternalId`.
- Cookie consent до аналитики.
- Privacy/offerta до запуска.
- XML 1C парсить без DTD/entities.
- Uploads: jpg/png/webp, max 5 MB, S3 storage.
- PostgreSQL backups daily, retention 30 дней.
- Для production webhook YooKassa закрыть проверкой источника/секрета и логировать только hash телефона.
- Для ножей перед запуском проверить юридические ограничения, сертификаты/описания и возрастной дисклеймер с юристом.
- На VPS не публиковать PostgreSQL/Redis наружу; текущие ports в compose оставлены для локального dev.
