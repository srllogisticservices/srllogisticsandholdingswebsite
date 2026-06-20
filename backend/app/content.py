import json
import os
import shutil
from datetime import datetime
from pathlib import Path

DATA_DIR = Path(os.getenv("DATA_DIR", Path(__file__).resolve().parents[2] / "data"))
BACKUP_DIR = Path(os.getenv("BACKUP_DIR", DATA_DIR.parent / "backups"))

CONTENT_FILES = {
    "projects": {
        "filename": "projects.json",
        "label": "Projects",
        "description": "Client projects, demo links, and featured work.",
    },
    "services": {
        "filename": "services.json",
        "label": "Services & Products",
        "description": "All services, hosted systems, stats, and testimonials. Opens a form editor (API saves to services.json).",
    },
    "home": {
        "filename": "home.json",
        "label": "Home Page",
        "description": "Hero text, heroSlides carousel images, stats, why choose us, and call-to-action.",
    },
    "about": {
        "filename": "about.json",
        "label": "About Us",
        "description": "Company story, values, and about page content.",
    },
    "branding": {
        "filename": "branding.json",
        "label": "Branding & Contact",
        "description": "Company name, logos, contact details, and consultation settings.",
    },
    "gallery": {
        "filename": "gallery.json",
        "label": "Photo Gallery",
        "description": "Gallery images shown on the home and about pages.",
    },
    "navigation": {
        "filename": "navigation.json",
        "label": "Navigation Menu",
        "description": "Main website menu structure.",
    },
    "backgrounds": {
        "filename": "backgrounds.json",
        "label": "Page Backgrounds",
        "description": "Background images used across pages.",
    },
}


def load_json(filename: str):
    path = DATA_DIR / filename
    if not path.exists():
        return None
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def get_content_file_path(file_key: str) -> Path:
    if file_key not in CONTENT_FILES:
        raise KeyError(file_key)
    return DATA_DIR / CONTENT_FILES[file_key]["filename"]


def read_content_file(file_key: str):
    path = get_content_file_path(file_key)
    if not path.exists():
        return None
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def validate_services_data(data) -> None:
    if not isinstance(data, dict):
        raise ValueError("services.json must be a JSON object")
    required_groups = ("services", "softwareSubServices", "itServices", "hostedSolutions", "stats", "testimonials")
    for group in required_groups:
        if group not in data or not isinstance(data[group], list):
            raise ValueError(f"Missing or invalid list: {group}")
    for group in ("services", "softwareSubServices", "itServices", "hostedSolutions"):
        for item in data[group]:
            if not item.get("id") or not item.get("slug") or not item.get("title"):
                raise ValueError(f"Each service in {group} needs id, slug, and title")


def save_content_file(file_key: str, data) -> dict:
    if file_key not in CONTENT_FILES:
        raise KeyError(file_key)

    if file_key == "services":
        validate_services_data(data)

    path = get_content_file_path(file_key)
    path.parent.mkdir(parents=True, exist_ok=True)

    if path.exists():
        BACKUP_DIR.mkdir(parents=True, exist_ok=True)
        stamp = datetime.utcnow().strftime("%Y%m%d-%H%M%S")
        backup_name = f"{path.stem}-{stamp}{path.suffix}"
        shutil.copy2(path, BACKUP_DIR / backup_name)

    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write("\n")

    return {
        "fileKey": file_key,
        "filename": CONTENT_FILES[file_key]["filename"],
        "savedAt": datetime.utcnow().isoformat() + "Z",
    }


def list_content_files():
    items = []
    for key, meta in CONTENT_FILES.items():
        path = DATA_DIR / meta["filename"]
        items.append(
            {
                "key": key,
                "label": meta["label"],
                "description": meta["description"],
                "filename": meta["filename"],
                "exists": path.exists(),
                "updatedAt": datetime.utcfromtimestamp(path.stat().st_mtime).isoformat() + "Z"
                if path.exists()
                else None,
            }
        )
    return items


def get_site_content():
    services_data = load_json("services.json") or {}
    return {
        "navigation": load_json("navigation.json") or [],
        "branding": load_json("branding.json") or {},
        "about": load_json("about.json") or {},
        "home": load_json("home.json") or {},
        "gallery": load_json("gallery.json") or [],
        "projects": load_json("projects.json") or {},
        "backgrounds": load_json("backgrounds.json") or {},
        "services": services_data.get("services", []),
        "softwareSubServices": services_data.get("softwareSubServices", []),
        "itServices": services_data.get("itServices", []),
        "hostedSolutions": services_data.get("hostedSolutions", []),
        "stats": services_data.get("stats", []),
        "testimonials": services_data.get("testimonials", []),
    }


def get_service_by_slug(slug: str):
    content = get_site_content()
    all_services = (
        content["services"]
        + content["softwareSubServices"]
        + content["itServices"]
        + content["hostedSolutions"]
    )
    normalized = slug if slug.startswith("/") else f"/{slug}"
    for service in all_services:
        if service.get("slug") == normalized or service.get("slug") == slug:
            return service
    return None


def get_contact_options():
    content = get_site_content()
    titles = []
    for group in ("services", "softwareSubServices", "itServices", "hostedSolutions"):
        titles.extend(s.get("title", "") for s in content.get(group, []))
    return titles + ["Multiple Services", "General Inquiry"]
