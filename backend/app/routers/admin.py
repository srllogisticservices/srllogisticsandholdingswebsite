from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from ..analytics_service import build_analytics_summary
from ..auth import (
    create_session,
    get_current_admin,
    revoke_session,
    security,
    verify_password,
)
from ..content import CONTENT_FILES, list_content_files, read_content_file, save_content_file
from ..auth import seed_admin_user
from ..database import AdminUser, ChatMessage, ContactSubmission, SessionLocal, get_db
from ..schemas import (
    AdminLoginRequest,
    AdminLoginResponse,
    AdminUserResponse,
    AnalyticsSummaryResponse,
    ChatLogResponse,
    ContactSubmissionResponse,
    ContentSaveRequest,
)

router = APIRouter(prefix="/api/admin", tags=["admin"])


@router.post("/login", response_model=AdminLoginResponse)
def admin_login(payload: AdminLoginRequest, db: Session = Depends(get_db)):
    user = (
        db.query(AdminUser)
        .filter(AdminUser.username == payload.username.strip(), AdminUser.is_active.is_(True))
        .first()
    )
    if not user or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid username or password")

    token, expires_at = create_session(db, user)
    return AdminLoginResponse(
        token=token,
        expiresAt=expires_at.isoformat() + "Z",
        user=AdminUserResponse(
            username=user.username,
            displayName=user.display_name,
            role=user.role,
        ),
    )


@router.post("/logout")
def admin_logout(
    credentials: HTTPAuthorizationCredentials | None = Depends(security),
    db: Session = Depends(get_db),
):
    if credentials and credentials.scheme.lower() == "bearer":
        revoke_session(db, credentials.credentials)
    return {"message": "Logged out"}


@router.get("/me", response_model=AdminUserResponse)
def admin_me(admin: AdminUser = Depends(get_current_admin)):
    return AdminUserResponse(
        username=admin.username,
        displayName=admin.display_name,
        role=admin.role,
    )


@router.get("/content")
def admin_list_content(admin: AdminUser = Depends(get_current_admin)):
    _ = admin
    return {"files": list_content_files()}


@router.get("/content/{file_key}")
def admin_get_content(file_key: str, admin: AdminUser = Depends(get_current_admin)):
    _ = admin
    if file_key not in CONTENT_FILES:
        raise HTTPException(status_code=404, detail="Unknown content file")
    data = read_content_file(file_key)
    return {
        "key": file_key,
        "label": CONTENT_FILES[file_key]["label"],
        "description": CONTENT_FILES[file_key]["description"],
        "filename": CONTENT_FILES[file_key]["filename"],
        "data": data if data is not None else {},
    }


@router.put("/content/{file_key}")
def admin_save_content(
    file_key: str,
    payload: ContentSaveRequest,
    admin: AdminUser = Depends(get_current_admin),
):
    _ = admin
    if file_key not in CONTENT_FILES:
        raise HTTPException(status_code=404, detail="Unknown content file")
    try:
        result = save_content_file(file_key, payload.data)
    except (TypeError, ValueError) as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    return {"message": "Content saved successfully", **result}


@router.get("/messages", response_model=list[ContactSubmissionResponse])
def admin_messages(admin: AdminUser = Depends(get_current_admin), db: Session = Depends(get_db)):
    _ = admin
    rows = db.query(ContactSubmission).order_by(ContactSubmission.created_at.desc()).limit(100).all()
    return [
        ContactSubmissionResponse(
            id=row.id,
            name=row.name,
            email=row.email,
            phone=row.phone,
            company=row.company,
            service=row.service,
            message=row.message,
            createdAt=row.created_at.isoformat() + "Z" if row.created_at else "",
        )
        for row in rows
    ]


@router.get("/analytics", response_model=AnalyticsSummaryResponse)
def admin_analytics(
    admin: AdminUser = Depends(get_current_admin),
    db: Session = Depends(get_db),
    days: int = 30,
):
    _ = admin
    days = max(7, min(days, 90))
    return AnalyticsSummaryResponse(**build_analytics_summary(db, history_days=days))


@router.get("/chat/logs", response_model=list[ChatLogResponse])
def admin_chat_logs(admin: AdminUser = Depends(get_current_admin), db: Session = Depends(get_db)):
    _ = admin
    rows = db.query(ChatMessage).order_by(ChatMessage.created_at.desc()).limit(100).all()
    return [
        ChatLogResponse(
            id=row.id,
            sessionId=row.session_id,
            visitorId=row.visitor_id,
            role=row.role,
            message=row.message,
            createdAt=row.created_at.isoformat() + "Z" if row.created_at else "",
        )
        for row in rows
    ]


def ensure_admin_user():
    db = SessionLocal()
    try:
        seed_admin_user(db)
    finally:
        db.close()
