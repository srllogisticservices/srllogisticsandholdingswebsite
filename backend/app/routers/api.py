from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
import uuid

from ..chat_ai import generate_chat_reply, get_chat_status, get_chat_welcome
from ..content import get_contact_options, get_service_by_slug, get_site_content
from ..database import ChatMessage, ContactSubmission, PageVisit, get_db
from ..schemas import (
    ChatRequest,
    ChatResponse,
    ChatStatusResponse,
    ChatWelcomeResponse,
    ContactCreate,
    ContactResponse,
    PageViewCreate,
    PageViewResponse,
)

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


@router.post("/analytics/pageview", response_model=PageViewResponse)
def track_pageview(payload: PageViewCreate, request: Request, db: Session = Depends(get_db)):
    user_agent = (request.headers.get("user-agent") or "")[:500] or None
    entry = PageVisit(
        visitor_id=payload.visitorId.strip(),
        path=payload.path.strip()[:500],
        page_title=(payload.pageTitle or "")[:300] or None,
        referrer=(payload.referrer or "")[:500] or None,
        user_agent=user_agent,
    )
    db.add(entry)
    db.commit()
    return PageViewResponse()


@router.get("/chat/status", response_model=ChatStatusResponse)
def chat_status():
    status = get_chat_status()
    return ChatStatusResponse(**status)


@router.get("/chat/welcome", response_model=ChatWelcomeResponse)
def chat_welcome():
    data = get_chat_welcome()
    return ChatWelcomeResponse(**data)


@router.post("/chat", response_model=ChatResponse)
def chat(payload: ChatRequest, db: Session = Depends(get_db)):
    session_id = (payload.sessionId or "").strip() or str(uuid.uuid4())
    visitor_id = (payload.visitorId or "").strip() or None
    user_message = payload.message.strip()

    prior = (
        db.query(ChatMessage)
        .filter(ChatMessage.session_id == session_id)
        .order_by(ChatMessage.created_at.asc())
        .limit(20)
        .all()
    )
    history = [{"role": row.role, "content": row.message} for row in prior]

    db.add(
        ChatMessage(
            session_id=session_id,
            visitor_id=visitor_id,
            role="user",
            message=user_message,
        )
    )

    reply, powered_by = generate_chat_reply(user_message, history)

    db.add(
        ChatMessage(
            session_id=session_id,
            visitor_id=visitor_id,
            role="assistant",
            message=reply,
        )
    )
    db.commit()

    return ChatResponse(reply=reply, sessionId=session_id, poweredBy=powered_by)
