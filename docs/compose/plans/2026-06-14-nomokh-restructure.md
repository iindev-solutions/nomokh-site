# Nomokh Project Restructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use compose:subagent (recommended) or compose:execute to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove old vanilla site files, rename `nomokh-nuxt/` → `frontend/`, update configs and documentation.

**Architecture:** Single-phase restructure. No code changes, only file operations and config updates.

**Tech Stack:** Git, Node.js, Nuxt 4

---

### Task 1: Remove Old Static Files

**Covers:** [S1]

**Files:**
- Delete: `index.html`
- Delete: `styles.css`
- Delete: `script.js`
- Delete: `package.json` (root level)
- Delete: `public/img/` (directory)
- Delete: `public/logo-nomokh.jpg`
- Delete: `docs/superpowers/` (directory)
- Delete: `AGENTS.md`

- [ ] **Step 1: Delete old static landing files**

```bash
rm index.html styles.css script.js package.json
rm -rf public/img public/logo-nomokh.jpg
rm -rf docs/superpowers
rm AGENTS.md
```

- [ ] **Step 2: Verify deletion**

```bash
ls -la
```

Expected output: Only `nomokh-nuxt/`, `.git/`, `.gitignore`, `.mimocode/` remain.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove old vanilla site files"
```

---

### Task 2: Rename nomokh-nuxt → frontend

**Covers:** [S2]

**Files:**
- Rename: `nomokh-nuxt/` → `frontend/`

- [ ] **Step 1: Rename directory**

```bash
git mv nomokh-nuxt frontend
```

- [ ] **Step 2: Verify rename**

```bash
ls -la
```

Expected output: `frontend/` directory exists, `nomokh-nuxt/` does not.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: rename nomokh-nuxt to frontend"
```

---

### Task 3: Create Root package.json

**Covers:** [S2]

**Files:**
- Create: `package.json` (root level)

- [ ] **Step 1: Create root package.json**

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

- [ ] **Step 2: Verify file exists**

```bash
cat package.json
```

- [ ] **Step 3: Commit**

```bash
git add package.json
git commit -m "chore: add root package.json with convenience scripts"
```

---

### Task 4: Update .gitignore

**Covers:** [S3]

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: Update .gitignore**

```gitignore
node_modules/
build/
dist/
coverage/
.DS_Store
*.log
.env*

# Nuxt
.nuxt/
.output/
frontend/.nuxt/
frontend/.output/

# PocketBase
data/
```

- [ ] **Step 2: Verify changes**

```bash
cat .gitignore
```

- [ ] **Step 3: Commit**

```bash
git add .gitignore
git commit -m "chore: update .gitignore for Nuxt and PocketBase"
```

---

### Task 5: Create AGENTS.md

**Covers:** [S4]

**Files:**
- Create: `AGENTS.md`

- [ ] **Step 1: Create AGENTS.md**

```markdown
# Agent Notes

## Repo: Two subprojects

| Project | Dir | Stack |
|---------|-----|-------|
| Frontend | `./frontend/` | Nuxt 4.4.8, Vue 3.5, Vue Router 5, TS |
| Backend | PocketBase (Docker) | SQLite, REST API, Admin Panel |

## Frontend (`./frontend/`)

- **Entry:** `pages/index.vue` → `components/App*.vue`
- **Dev:** `npm run dev` from `frontend/` directory (port 3000)
- **Build:** `npm run build`, **Generate:** `npm run generate`, **Preview:** `npm run preview`
- **All styles** in single file: `assets/css/main.css` (~1266 lines) — no modules, no Tailwind
- GSAP + Glide.js loaded via CDN in `nuxt.config.ts` `app.head.script`
- TypeScript enabled via `tsconfig.json` (extends `./.nuxt/tsconfig.json`)
- Auto-generated `.nuxt/` (gitignored) — regen with `npx nuxt prepare`

## Backend (PocketBase)

- **Docker:** `docker compose up -d`
- **Admin:** `http://localhost:8090/_/`
- **API:** `http://localhost:8090/api/`
- **Database:** SQLite at `./data/pb_data/`

## Shared design conventions

- **Container:** `.l-wrapper` — `max-width: 1440px; padding: 0 16px; margin: 0 auto`
- **Font:** Inter from Google Fonts CDN in `<head>`
- **Design tokens** (CSS custom properties):

  | Token | Value |
  |-------|-------|
  | `--color-orange` | `#EF7E31` |
  | `--color-dark` | `#2E2F31` |
  | `--color-gray` | `#A8A8A8` |
  | `--color-light` | `#E4E4E4` |

- **Animations:** GSAP 3 + ScrollTrigger via CDN; all sections use `[data-anim]` with opacity/translateY fade-in

## Sections (in order)

1. Header (fixed, transparent → dark on scroll, burger overlay menu)
2. Hero (full viewport, split dark/orange halves)
3. About (2-col grid, Glide.js slider on right)
4. Features (dark bg, 3 cards)
5. Catalog (orange header, 2-col image grid)
6. Services (orange header, 3-row list with images)
7. Contacts (form + Yandex map)
8. Footer (split dark/light halves, no divider)

## Contacts & Social

- **Phone:** `8 (924) 464-08-88` — links to WhatsApp `wa.me/+79244640888`
- **Social:** YouTube, WhatsApp, Instagram (in footer right half)

## Gotchas

- `.l-wrapper` should never carry utility classes (golden rule)
- Shadow pseudo-elements use `width: 100vw` with `position: absolute` — the parent section must have `overflow: hidden`
- Burger overlay needs `pointer-events: none` when closed, `pointer-events: auto` when open
```

- [ ] **Step 2: Verify file exists**

```bash
cat AGENTS.md
```

- [ ] **Step 3: Commit**

```bash
git add AGENTS.md
git commit -m "chore: create AGENTS.md with project structure"
```

---

### Task 6: Update Memory

**Covers:** [S5]

**Files:**
- Modify: MEMORY.md (project memory)

- [ ] **Step 1: Update MEMORY.md**

Update the "Current phase" line to reflect the new structure.

- [ ] **Step 2: Verify changes**

```bash
cat MEMORY.md | grep "Current phase"
```

- [ ] **Step 3: Commit**

```bash
git add MEMORY.md
git commit -m "chore: update project memory with new structure"
```

---

## Verification

After all tasks:

1. `ls` in root: `frontend/`, `.git/`, `.gitignore`, `.mimocode/`, `package.json`, `AGENTS.md`
2. `cd frontend && npm run dev` — site works on port 3000
3. `git status` — clean, all old files removed
4. `git log --oneline -6` — shows all commits
