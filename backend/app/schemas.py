from typing import Any

from pydantic import BaseModel, Field, field_validator
import re

EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


class ContactCreate(BaseModel):
    name: str = Field(min_length=2, max_length=200)
    email: str = Field(min_length=5, max_length=200)
    phone: str | None = None
    company: str | None = None
    service: str = Field(min_length=1, max_length=200)
    message: str = Field(min_length=10, max_length=5000)

    @field_validator("email")
    @classmethod
    def valid_email(cls, v: str) -> str:
        if not EMAIL_RE.match(v):
            raise ValueError("Invalid email address")
        return v


class ContactResponse(BaseModel):
    id: int
    message: str = "Thank you! We received your message and will respond within 24 hours."


class AdminLoginRequest(BaseModel):
    username: str = Field(min_length=2, max_length=100)
    password: str = Field(min_length=4, max_length=200)


class AdminUserResponse(BaseModel):
    username: str
    displayName: str
    role: str


class AdminLoginResponse(BaseModel):
    token: str
    expiresAt: str
    user: AdminUserResponse


class ContentSaveRequest(BaseModel):
    data: Any


class ContactSubmissionResponse(BaseModel):
    id: int
    name: str
    email: str
    phone: str | None
    company: str | None
    service: str
    message: str
    createdAt: str
