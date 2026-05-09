# Deployment

## Target

- VPS / cloud VM (Yandex Cloud / Selectel / Timeweb) with Docker Compose.
- Or managed container platform (Yandex Cloud Serverless Containers) for API, static on Object Storage + CDN.
- Domain: nomokh.ru (acquire before prod).

## Environment

- Docker Compose: `web` (Nuxt node server), `db` (PostgreSQL), `redis` (Redis), `nginx` (reverse proxy + static).
- `.env.production` on host, not in image.
- SSL: Let's Encrypt via certbot or Yandex certificate.

## Release Steps

1. Version bump + tag.
2. `docker build -t nomokh-web .`
3. Push to registry.
4. SSH to server, `docker-compose pull && docker-compose up -d`.
5. Run `npx prisma migrate deploy` inside container.
6. Verify health endpoint `/api/health`.

## Rollback

- Keep previous image tag. `docker-compose up -d` with previous tag if health check fails.
- DB rollback: tested `down` migration ready for critical deploys.

## Verification

```bash
# health
curl https://nomokh.ru/api/health

# checkout smoke (staging)
# - add to cart → checkout → payment widget opens (test mode)
```

## Monitoring

- Uptime: UptimeRobot / Yandex Monitoring.
- Errors: Sentry or self-hosted GlitchTip.
- Logs: vector → ClickHouse or Loki (optional, can defer).
