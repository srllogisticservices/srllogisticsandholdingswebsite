# SRL Logistics & Holdings — Website

Full-stack, dynamic business website with a React frontend, FastAPI backend, and Docker deployment.

## Project Structure

```
SRL_logistics_and_Holdings/
├── frontend/          # React + Vite + Tailwind (UI)
├── backend/           # FastAPI API (dynamic content + contact form)
├── data/              # JSON content files (editable without code changes)
├── nginx/             # Production reverse proxy config
├── scripts/           # Dev & export scripts
├── backups/           # Database backup storage
├── docker-compose.yml
├── .env.example
├── MANUAL.md
└── README.md
```

## Quick Start (Development)

### 1. Backend API
```powershell
.\scripts\start-backend.ps1
```
API runs at **http://localhost:8000** — docs at **http://localhost:8000/docs**

### 2. Frontend
```powershell
.\scripts\start-frontend.ps1
```
Site runs at **http://localhost:5173**

## Docker (Production)

```bash
docker compose up --build
```
Open **http://localhost**

## Dynamic Content

Edit JSON files in `data/` to update the site without rebuilding the frontend:

| File | Content |
|------|---------|
| `home.json` | Hero, stats, testimonials, CTA |
| `about.json` | Our Story, values |
| `services.json` | All services (run export script after frontend changes) |
| `navigation.json` | Menu structure |
| `branding.json` | Logo paths, contact info |
| `gallery.json` | Photo gallery |

After editing services in `frontend/src/data/services.js`, run:
```powershell
.\scripts\export-content.ps1
```

## Contact Form

Submissions are saved to `data/srl.db` via the API.

## Requirements

- **Node.js 18+** for frontend
- **Python 3.12** recommended for backend (Docker uses 3.12). Python 3.14+ may need Docker for the API.

- **Frontend:** React 19, Vite, Tailwind CSS v4, React Router
- **Backend:** FastAPI, SQLAlchemy, SQLite
- **Deploy:** Docker, Nginx
