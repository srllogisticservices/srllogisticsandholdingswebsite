# SRL Logistics & Holdings — User Manual

## Overview

This website uses a **dynamic architecture**: the frontend loads content from the backend API, which reads editable JSON files from the `data/` folder.

## Folder Guide

### `frontend/`
The user interface — pages, components, styles. Built with React and Tailwind CSS.

### `backend/`
The API server. Handles:
- Serving site content (`GET /api/content`)
- Individual services (`GET /api/services/{slug}`)
- Contact form submissions (`POST /api/contact`)

### `data/`
**Edit these files to update website content:**

- **about.json** — Our Story paragraphs, values, About page text
- **home.json** — Homepage hero, stats, why choose us, testimonials
- **branding.json** — Company name, logos, phone, email, address
- **navigation.json** — Menu items
- **gallery.json** — Project photos
- **services.json** — All service pages (auto-generated)

### `nginx/`
Production web server configuration. Proxies `/api` to the backend.

### `scripts/`
- `start-backend.ps1` — Run API locally
- `start-frontend.ps1` — Run website locally
- `export-content.ps1` — Sync services from frontend code to JSON

### `backups/`
Store database backups here.

## Updating "Our Story"

1. Open `data/about.json`
2. Edit the `story.paragraphs` array
3. Save the file
4. Refresh the browser — changes appear immediately (no rebuild needed)

## Updating Contact Details

Edit `data/branding.json` → `contact` section.

## Updating Logos

Replace files in `frontend/public/images/`:
- `logo.svg` — header
- `logo-white.svg` — footer
- `logo-icon.svg` — browser tab

## Running Locally

**Terminal 1 — Backend:**
```powershell
.\scripts\start-backend.ps1
```

**Terminal 2 — Frontend:**
```powershell
.\scripts\start-frontend.ps1
```

Visit: http://localhost:5173/about for Our Story

## Production Deployment

```bash
cp .env.example .env
docker compose up --build -d
```

## API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/content` | All site content |
| GET | `/api/services/{slug}` | Single service |
| POST | `/api/contact` | Submit contact form |
| GET | `/docs` | API documentation |

## Troubleshooting

**Site shows loading forever**
- Ensure backend is running on port 8000
- Check browser console for API errors

**Contact form fails**
- Backend must be running
- Check `data/` folder is writable for SQLite database

**Changes to JSON not showing**
- Hard refresh browser (Ctrl+F5)
- Restart backend if caching is enabled
