# Plan: Restructure project — remove old static, rename to frontend/

## Context

Nuxt 4 порт готов, работает. Старый статический лендинг больше не нужен. Решённая архитектура: **Nuxt 4 + Medusa.js + PostgreSQL + Plausible Analytics** через Docker Compose.

## Step 1: Remove old static landing files

Удалить из корня:
- `index.html`
- `styles.css`
- `script.js`
- `package.json` (корневой — был `npx serve .` для статики)
- `public/` (старые картинки статики — `img/`, `logo-nomokh.jpg`)
- `docs/` (superpowers/specs — больше не нужен)

## Step 2: Rename nomokh-nuxt/ → frontend/

```bash
git mv nomokh-nuxt frontend
```

## Step 3: Create root package.json

```json
{
  "name": "nomokh",
  "private": true,
  "scripts": {
    "dev": "npm run dev --prefix frontend",
    "build": "npm run build --prefix frontend",
    "generate": "npm run generate --prefix frontend",
    "preview": "npm run preview --prefix frontend"
  }
}
```

## Step 4: Update .gitignore

Добавить:
```
.nuxt/
.output/
frontend/.nuxt/
frontend/.output/
.env
```

## Step 5: Update AGENTS.md

Обновить пути и структуру проекта.

## Step 6: Commit

`refactor: remove old static landing, restructure as frontend/`

---

## Backend (следующий шаг после реструктуризации)

Из предыдущей сессии уже решено:

| Компонент | Технология |
|-----------|-----------|
| Frontend | Nuxt 4 (SSR) |
| E-commerce API | Medusa.js |
| Database | PostgreSQL |
| Analytics | Plausible (self-hosted) |
| State | Pinia (корзина) |
| Deploy | Docker Compose → VPS |
| Импорт 1C | CSV → Medusa Admin |

Деплой на VPS: Timeweb (от 300₽/мес) или Hetzner (от €4/мес).

### Docker Compose сервисы:
- `nuxt` — фронтенд
- `medusa-server` — e-commerce API
- `postgres` — база данных
- `plausible` — аналитика

---

## Verification

1. `ls` в корне: `frontend/`, `.git/`, `.gitignore`, `.mimocode/`, `package.json`, `AGENTS.md`
2. `cd frontend && npm run dev` — сайт работает на порту 3000
3. `git status` — чисто
