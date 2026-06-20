import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import init_db
from .routers import admin, api

app = FastAPI(
    title="SRL Logistics & Holdings API",
    description="Dynamic content and contact API for SRL website",
    version="1.0.0",
)

origins = os.getenv("CORS_ORIGINS", "http://localhost:5173,http://localhost:5174,http://localhost").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in origins if o.strip()],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api.router)
app.include_router(admin.router)


@app.on_event("startup")
def on_startup():
    init_db()
    admin.ensure_admin_user()


@app.get("/")
def root():
    return {"message": "SRL API running", "docs": "/docs"}
