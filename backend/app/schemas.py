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


class PageViewCreate(BaseModel):
    visitorId: str = Field(min_length=8, max_length=64)
    path: str = Field(min_length=1, max_length=500)
    pageTitle: str | None = Field(default=None, max_length=300)
    referrer: str | None = Field(default=None, max_length=500)


class PageViewResponse(BaseModel):
    ok: bool = True


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=2000)
    sessionId: str | None = Field(default=None, max_length=64)
    visitorId: str | None = Field(default=None, max_length=64)


class ChatResponse(BaseModel):
    reply: str
    sessionId: str
    poweredBy: str = "fallback"


class ChatStatusResponse(BaseModel):
    aiEnabled: bool
    provider: str | None = None
    model: str | None = None


class ChatWelcomeResponse(BaseModel):
    welcomeMessage: str
    suggestedQuestions: list[str]
    aiEnabled: bool
    provider: str | None = None
    poweredBy: str = "fallback"


class TopPageStat(BaseModel):
    path: str
    views: int


class DailyVisitStat(BaseModel):
    date: str
    pageViews: int
    uniqueVisitors: int
    homeViews: int
    otherViews: int


class ServiceDemandStat(BaseModel):
    service: str
    pageViews: int
    inquiries: int
    totalInterest: int


class AnalyticsSummaryResponse(BaseModel):
    totalPageViews: int
    uniqueVisitors: int
    uniqueVisitorsToday: int
    viewsToday: int
    viewsThisWeek: int
    homeViewsToday: int
    otherViewsToday: int
    chatMessages: int
    topPages: list[TopPageStat]
    dailyHistory: list[DailyVisitStat]
    topServices: list[ServiceDemandStat]


class ChatLogResponse(BaseModel):
    id: int
    sessionId: str
    visitorId: str | None
    role: str
    message: str
    createdAt: str
