# Nomokh Architecture Design

## [S1] Problem

Nomokh (НОМОХ) — Yakut goods e-commerce store. Need to migrate from vanilla HTML/CSS/JS to a modern stack with admin panel for product management, CSV import from 1C, and analytics.

**Constraints:**
- 50-200 products
- No online payment initially
- Budget: 500-1000₽/month for VPS
- Russian market (domain .ru)
- Privacy-first analytics (152-ФЗ compliant)

## [S2] Solution Overview

**Stack:**
- **Frontend:** Nuxt 4 (SSR, port from vanilla site)
- **Backend:** PocketBase (SQLite + admin panel + REST API)
- **Analytics:** Plausible (self-hosted, Docker)
- **Deploy:** Docker Compose on VPS

**Why PocketBase over Medusa/Strapi:**
- Single binary, zero config
- Admin panel included (no custom code needed)
- SQLite = no PostgreSQL overhead
- REST API included
- File storage included
- Ideal for 50-200 products
- 1-2 days setup with AI vs 3-4 days for Medusa

## [S3] Architecture

```
┌─────────────────────────────────────────────┐
│                   VPS (500-1000₽/мес)       │
│                                              │
│  ┌──────────┐  ┌──────────┐                 │
│  │  Nuxt 4  │  │PocketBase│                 │
│  │  (SSR)   │──│  :8090   │                 │
│  │  :3000   │  │  SQLite  │                 │
│  └──────────┘  └──────────┘                 │
│                                              │
│  ┌──────────┐                                │
│  │ Plausible│  (аналитика)                   │
│  │  :8000   │                                │
│  └──────────┘                                │
└─────────────────────────────────────────────┘
```

**Ports:**
- Nuxt: 3000 (frontend)
- PocketBase: 8090 (API + admin)
- Plausible: 8000 (analytics)

## [S4] Data Model

### Products Collection (PocketBase)

| Field | Type | Description |
|-------|------|-------------|
| name | text | Product name |
| slug | text (unique) | URL-friendly name |
| description | text | Product description |
| price | number | Price in RUB |
| category | select | Category (knives, thermos, clothing, jewelry) |
| images | file (multiple) | Product images |
| in_stock | boolean | Availability |
| featured | boolean | Show on homepage |
| created | auto | Timestamp |
| updated | auto | Timestamp |

### Orders Collection

| Field | Type | Description |
|-------|------|-------------|
| customer_name | text | Customer name |
| customer_phone | text | Phone number |
| customer_email | text | Email (optional) |
| items | json | Array of {product_id, quantity, price} |
| total | number | Total amount |
| status | select | pending/confirmed/shipped/delivered |
| created | auto | Timestamp |

### Pages Collection (static content)

| Field | Type | Description |
|-------|------|-------------|
| slug | text (unique) | Page identifier (about, services, contacts) |
| title | text | Page title |
| content | json | Rich text content |
| updated | auto | Timestamp |

## [S5] Nuxt Integration

### Composables

```typescript
// composables/useProducts.ts
export const useProducts = () => {
  const pb = usePocketBase()
  
  const getProducts = (filters?: ProductFilters) => {
    return pb.collection('products').getFullList({
      filter: buildFilter(filters),
      sort: '-created'
    })
  }
  
  const getProduct = (slug: string) => {
    return pb.collection('products').getFirstListItem(`slug = "${slug}"`)
  }
  
  return { getProducts, getProduct }
}

// composables/useCart.ts
export const useCart = () => {
  const items = useState<CartItem[]>('cart', () => [])
  
  const addItem = (product: Product, quantity: number) => { ... }
  const removeItem = (productId: string) => { ... }
  const clear = () => { ... }
  const total = computed(() => ...)
  
  return { items, addItem, removeItem, clear, total }
}

// composables/usePocketBase.ts
export const usePocketBase = () => {
  return useState('pb', () => new PocketBase('http://localhost:8090'))
}
```

### Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero + featured products |
| Catalog | `/catalog` | All products with filters |
| Product | `/catalog/:slug` | Product detail page |
| About | `/about` | Static content from Pages collection |
| Services | `/services` | Static content |
| Contacts | `/contacts` | Form + map |
| Cart | `/cart` | Cart summary + checkout form |
| Admin | `http://localhost:8090/_/` | PocketBase admin (separate) |

## [S6] Docker Compose

```yaml
version: '3.8'

services:
  nuxt:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - POCKETBASE_URL=http://pocketbase:8090
    depends_on:
      - pocketbase
    restart: unless-stopped

  pocketbase:
    image: pocketbase/pocketbase:latest
    ports:
      - "8090:8090"
    volumes:
      - ./data/pb_data:/pb/pb_data
      - ./data/pb_public:/pb/pb_public
    restart: unless-stopped

  plausible:
    image: ghcr.io/plausible/community-edition:v2.0
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=sqlite:///var/lib/plausible/db.sqlite
      - BASE_URL=https://nomokh.ru
      - SECRET_KEY_BASE=<generated>
    volumes:
      - ./data/plausible:/var/lib/plausible
    restart: unless-stopped
```

## [S7] Deployment

### VPS Requirements

| Spec | Minimum | Recommended |
|------|---------|-------------|
| CPU | 1 vCPU | 2 vCPU |
| RAM | 2GB | 4GB |
| Storage | 40GB SSD | 80GB SSD |
| OS | Ubuntu 22.04 | Ubuntu 24.04 |
| Cost | 500₽/мес | 800₽/мес |

### Deployment Steps

1. **VPS Setup:**
   ```bash
   apt update && apt upgrade -y
   apt install docker.io docker-compose-plugin -y
   systemctl enable docker
   ```

2. **Domain Setup:**
   - Register `nomokh.ru` at reg.ru
   - Point A record to VPS IP
   - Wait for DNS propagation

3. **SSL Certificate:**
   ```bash
   apt install certbot -y
   certbot certonly --standalone -d nomokh.ru -d www.nomokh.ru
   ```

4. **Deploy:**
   ```bash
   git clone <repo> /opt/nomokh
   cd /opt/nomokh
   docker compose up -d
   ```

5. **PocketBase Admin:**
   - Open `http://nomokh.ru:8090/_/`
   - Create admin account
   - Create collections (products, orders, pages)
   - Import products via CSV

## [S8] CSV Import from 1C

### Format

```csv
name,slug,description,price,category,in_stock,featured
"Нож Якутский","nozh-yakutskiy","Классический якутский нож",4500,knives,true,true
"Термос 1л","termos-1l","Термос из нержавеющей стали",2800,thermos,true,false
```

### Import Script

```javascript
// scripts/import-csv.js
import PocketBase from 'pocketbase'
import fs from 'fs'
import csv from 'csv-parser'

const pb = new PocketBase('http://localhost:8090')
await pb.admins.authWithPassword('admin@nomokh.ru', 'password')

fs.createReadStream('products.csv')
  .pipe(csv())
  .on('data', async (row) => {
    await pb.collection('products').create(row)
    console.log(`Imported: ${row.name}`)
  })
```

### Usage

```bash
node scripts/import-csv.js products.csv
```

## [S9] Analytics

### Plausible Metrics

- **Visitors:** Unique visitors per day/week/month
- **Pageviews:** Total page views
- **Sources:** Where visitors come from (Google, direct, social)
- **Pages:** Which pages are popular
- **Countries:** Geographic distribution
- **Devices:** Mobile vs desktop
- **Bounce rate:** Single-page sessions

### Setup

- Self-hosted on same VPS
- No cookies, GDPR/152-ФЗ compliant
- Lightweight script (~1KB)
- Dashboard at `http://nomokh.ru:8000`

## [S10] Security Considerations

- PocketBase admin panel: Restrict access by IP or use VPN
- SSL/TLS: Let's Encrypt for HTTPS
- Rate limiting: PocketBase built-in rate limiting
- Backups: Daily SQLite backup to S3 or local
- Updates: Monthly `docker compose pull && docker compose up -d`

## [S11] Cost Summary

| Item | Monthly Cost |
|------|--------------|
| VPS (2 vCPU, 4GB RAM) | 500-800₽ |
| Domain (nomokh.ru) | ~40₽ (500₽/year) |
| SSL Certificate | Free (Let's Encrypt) |
| Plausible | Free (self-hosted) |
| PocketBase | Free (open-source) |
| **Total** | **~600-900₽/мес** |

## [S12] Migration Plan

### Phase 1: Project Restructure (today)
- Remove old vanilla files
- Rename `nomokh-nuxt/` → `frontend/`
- Update .gitignore, AGENTS.md

### Phase 2: PocketBase Setup (1-2 days)
- Docker Compose configuration
- PocketBase collections setup
- Admin panel configuration
- CSV import script

### Phase 3: Nuxt Integration (2-3 days)
- Composables (useProducts, useCart, usePocketBase)
- Product pages (catalog, detail)
- Cart functionality
- Checkout form

### Phase 4: Content & Polish (1-2 days)
- Static pages (about, services, contacts)
- Responsive design
- Performance optimization

### Phase 5: Deployment (1 day)
- VPS setup
- Domain + SSL
- Docker Compose deploy
- Plausible analytics setup

**Total: 5-8 days with AI assistance**
