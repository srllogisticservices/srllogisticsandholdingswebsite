import hashlib
import os
import secrets
from datetime import datetime, timedelta

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from .database import AdminSession, AdminUser, get_db

SESSION_HOURS = int(os.getenv("ADMIN_SESSION_HOURS", "24"))
security = HTTPBearer(auto_error=False)


def hash_password(password: str) -> str:
    salt = secrets.token_hex(16)
    digest = hashlib.pbkdf2_hmac("sha256", password.encode(), salt.encode(), 100_000)
    return f"{salt}${digest.hex()}"


def verify_password(password: str, stored: str) -> bool:
    try:
        salt, digest = stored.split("$", 1)
    except ValueError:
        return False
    check = hashlib.pbkdf2_hmac("sha256", password.encode(), salt.encode(), 100_000)
    return secrets.compare_digest(digest, check.hex())


def create_session(db: Session, user: AdminUser) -> tuple[str, datetime]:
    token = secrets.token_urlsafe(48)
    expires_at = datetime.utcnow() + timedelta(hours=SESSION_HOURS)
    db.add(AdminSession(token=token, user_id=user.id, expires_at=expires_at))
    db.commit()
    return token, expires_at


def revoke_session(db: Session, token: str) -> None:
    session = db.query(AdminSession).filter(AdminSession.token == token).first()
    if session:
        db.delete(session)
        db.commit()


def get_user_by_token(db: Session, token: str) -> AdminUser | None:
    session = (
        db.query(AdminSession)
        .filter(AdminSession.token == token, AdminSession.expires_at > datetime.utcnow())
        .first()
    )
    if not session:
        return None
    return db.query(AdminUser).filter(AdminUser.id == session.user_id, AdminUser.is_active.is_(True)).first()


def seed_admin_user(db: Session) -> None:
    username = os.getenv("ADMIN_USERNAME", "admin").strip()
    password = os.getenv("ADMIN_PASSWORD", "SRLAdmin2026!")
    display_name = os.getenv("ADMIN_DISPLAY_NAME", "System Administrator")

    existing = db.query(AdminUser).filter(AdminUser.username == username).first()
    if existing:
        return

    db.add(
        AdminUser(
            username=username,
            display_name=display_name,
            role="system_administrator",
            password_hash=hash_password(password),
            is_active=True,
        )
    )
    db.commit()


def get_current_admin(
    credentials: HTTPAuthorizationCredentials | None = Depends(security),
    db: Session = Depends(get_db),
) -> AdminUser:
    if not credentials or credentials.scheme.lower() != "bearer":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication required")

    user = get_user_by_token(db, credentials.credentials)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired session")
    return user
