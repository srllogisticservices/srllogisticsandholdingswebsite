from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..content import get_contact_options, get_service_by_slug, get_site_content
from ..database import ContactSubmission, get_db
from ..schemas import ContactCreate, ContactResponse

router = APIRouter(prefix="/api", tags=["api"])


@router.get("/health")
def health():
    return {"status": "ok", "service": "SRL Logistics & Holdings API"}


@router.get("/content")
def site_content():
    return get_site_content()


@router.get("/services/{slug:path}")
def service_detail(slug: str):
    service = get_service_by_slug(slug)
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    return service


@router.get("/contact/options")
def contact_options():
    return {"options": get_contact_options()}


@router.post("/contact", response_model=ContactResponse)
def submit_contact(payload: ContactCreate, db: Session = Depends(get_db)):
    entry = ContactSubmission(
        name=payload.name,
        email=payload.email,
        phone=payload.phone,
        company=payload.company,
        service=payload.service,
        message=payload.message,
    )
    db.add(entry)
    db.commit()
    db.refresh(entry)
    return ContactResponse(id=entry.id)
