# Деплой на VPS

## Минимальный сервер

- Ubuntu 22.04/24.04 LTS
- 2 CPU / 4 GB RAM / 40 GB SSD
- Docker Engine + Docker Compose plugin
- Ports: 22, 80, 443

## DNS

```text
nomokh.ru        A    <VPS_IP>
www.nomokh.ru    A    <VPS_IP>
```

## Команды

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y ca-certificates curl git ufw
sudo ufw allow OpenSSH
sudo ufw allow 80
sudo ufw allow 443
sudo ufw --force enable

git clone <repo-url> /opt/nomokh
cd /opt/nomokh
cp .env.example .env
nano .env
docker compose -f docker-compose.prod.yml up -d --build
docker compose -f docker-compose.prod.yml exec web pnpm db:seed
curl -f https://nomokh.ru/api/health
```

## Обязательные env для production

```env
NODE_ENV=production
NUXT_PUBLIC_SITE_URL=https://nomokh.ru
SITE_DOMAIN=nomokh.ru,www.nomokh.ru
NUXT_PUBLIC_DEMO_MODE=false
JWT_SECRET=<64-random-chars>
REFRESH_TOKEN_SECRET=<64-random-chars>
OTP_HASH_SECRET=<64-random-chars>
ADMIN_API_TOKEN=<64-random-chars>
POSTGRES_PASSWORD=<strong-password>
DATABASE_URL=postgresql://nomokh:<strong-password>@db:5432/nomokh?schema=public
REDIS_URL=redis://redis:6379
```

## Production hardening

`docker-compose.yml` оставлен для local/dev и публикует PostgreSQL/Redis на host. Для production используйте отдельный файл:

```bash
docker compose -f docker-compose.prod.yml up -d --build
docker compose -f docker-compose.prod.yml exec web pnpm db:seed
curl -f https://nomokh.ru/api/health
```

`docker-compose.prod.yml` не публикует PostgreSQL/Redis наружу. Снаружи доступны только 80/443 и SSH.

## SSL

Production compose uses Caddy. It issues and renews TLS certificates automatically for `SITE_DOMAIN`. DNS A-records must point to VPS before first run.

## Update

```bash
git pull
docker compose -f docker-compose.prod.yml up -d --build
docker compose -f docker-compose.prod.yml exec web pnpm prisma:deploy
curl http://localhost/api/health
```
