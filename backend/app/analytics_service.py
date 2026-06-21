"""Visitor analytics and service demand reporting."""

from datetime import datetime, timedelta

from sqlalchemy import func
from sqlalchemy.orm import Session

from .content import get_site_content
from .database import ChatMessage, ContactSubmission, PageVisit


def _slug_to_title() -> dict[str, str]:
    content = get_site_content()
    mapping = {
        "/": "Home",
        "/about": "About Us",
        "/contact": "Contact",
        "/quote": "Get a Quote",
        "/services": "All Services",
        "/projects": "Projects",
    }
    for group in ("services", "softwareSubServices", "itServices", "hostedSolutions"):
        for svc in content.get(group, []):
            slug = svc.get("slug", "")
            title = svc.get("title", "")
            if slug and title:
                mapping[slug] = title
                mapping[slug.rstrip("/")] = title
    return mapping


def _is_home_path(path: str) -> bool:
    base = (path or "/").split("?")[0] or "/"
    return base == "/"


def _service_from_path(path: str, slug_map: dict[str, str]) -> str | None:
    base = path.split("?")[0] or "/"
    if base.startswith("/services/") and base not in ("/services",):
        return slug_map.get(base, base.replace("/services/", "").replace("-", " ").title())
    return None


def build_analytics_summary(db: Session, history_days: int = 30) -> dict:
    now = datetime.utcnow()
    start_of_day = now.replace(hour=0, minute=0, second=0, microsecond=0)
    start_of_week = start_of_day - timedelta(days=start_of_day.weekday())
    history_start = start_of_day - timedelta(days=history_days - 1)

    slug_map = _slug_to_title()

    total_page_views = db.query(func.count(PageVisit.id)).scalar() or 0
    unique_visitors = db.query(func.count(func.distinct(PageVisit.visitor_id))).scalar() or 0
    views_today = db.query(func.count(PageVisit.id)).filter(PageVisit.created_at >= start_of_day).scalar() or 0
    views_this_week = (
        db.query(func.count(PageVisit.id)).filter(PageVisit.created_at >= start_of_week).scalar() or 0
    )
    unique_visitors_today = (
        db.query(func.count(func.distinct(PageVisit.visitor_id)))
        .filter(PageVisit.created_at >= start_of_day)
        .scalar()
        or 0
    )
    chat_messages = db.query(func.count(ChatMessage.id)).filter(ChatMessage.role == "user").scalar() or 0

    home_views_today = (
        db.query(func.count(PageVisit.id))
        .filter(PageVisit.created_at >= start_of_day)
        .filter(PageVisit.path == "/")
        .scalar()
        or 0
    )
    other_views_today = max(views_today - home_views_today, 0)

    top_rows = (
        db.query(PageVisit.path, func.count(PageVisit.id).label("views"))
        .group_by(PageVisit.path)
        .order_by(func.count(PageVisit.id).desc())
        .limit(10)
        .all()
    )

    return {
        "totalPageViews": total_page_views,
        "uniqueVisitors": unique_visitors,
        "uniqueVisitorsToday": unique_visitors_today,
        "viewsToday": views_today,
        "viewsThisWeek": views_this_week,
        "homeViewsToday": home_views_today,
        "otherViewsToday": other_views_today,
        "chatMessages": chat_messages,
        "topPages": [{"path": row.path, "views": row.views} for row in top_rows],
        "dailyHistory": _build_daily_history(db, history_start, start_of_day),
        "topServices": _build_service_demand(db, slug_map, history_start),
    }


def _build_daily_history(db: Session, start: datetime, end_day: datetime) -> list[dict]:
    rows = (
        db.query(PageVisit)
        .filter(PageVisit.created_at >= start)
        .order_by(PageVisit.created_at.asc())
        .all()
    )

    buckets: dict[str, dict] = {}
    day = start.date()
    end_date = end_day.date()
    while day <= end_date:
        key = day.isoformat()
        buckets[key] = {
            "date": key,
            "pageViews": 0,
            "uniqueVisitors": set(),
            "homeViews": 0,
            "otherViews": 0,
        }
        day += timedelta(days=1)

    for row in rows:
        if not row.created_at:
            continue
        key = row.created_at.date().isoformat()
        if key not in buckets:
            continue
        bucket = buckets[key]
        bucket["pageViews"] += 1
        bucket["uniqueVisitors"].add(row.visitor_id)
        if _is_home_path(row.path):
            bucket["homeViews"] += 1
        else:
            bucket["otherViews"] += 1

    return [
        {
            "date": buckets[key]["date"],
            "pageViews": buckets[key]["pageViews"],
            "uniqueVisitors": len(buckets[key]["uniqueVisitors"]),
            "homeViews": buckets[key]["homeViews"],
            "otherViews": buckets[key]["otherViews"],
        }
        for key in sorted(buckets.keys(), reverse=True)
    ]


def _build_service_demand(db: Session, slug_map: dict[str, str], since: datetime) -> list[dict]:
    page_counts: dict[str, int] = {}
    for (path,) in db.query(PageVisit.path).filter(PageVisit.created_at >= since).all():
        service = _service_from_path(path or "", slug_map)
        if service:
            page_counts[service] = page_counts.get(service, 0) + 1

    inquiry_counts: dict[str, int] = {}
    for (service,) in db.query(ContactSubmission.service).filter(ContactSubmission.created_at >= since).all():
        name = (service or "General Inquiry").strip()
        inquiry_counts[name] = inquiry_counts.get(name, 0) + 1

    all_services = set(page_counts.keys()) | set(inquiry_counts.keys())
    results = []
    for name in all_services:
        views = page_counts.get(name, 0)
        inquiries = inquiry_counts.get(name, 0)
        results.append(
            {
                "service": name,
                "pageViews": views,
                "inquiries": inquiries,
                "totalInterest": views + (inquiries * 3),
            }
        )

    results.sort(key=lambda item: (-item["totalInterest"], -item["pageViews"], item["service"]))
    return results[:15]
