"""SRL website AI assistant — OpenAI / Gemini with site knowledge and conversation memory."""

import json
import os
import re
import time
import urllib.error
import urllib.request

from .content import get_site_content

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "").strip()
OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-4o-mini")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "").strip()
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")
CHAT_AI_PROVIDER = os.getenv("CHAT_AI_PROVIDER", "auto").strip().lower()

MAX_HISTORY = 12
MAX_TOKENS = 400
SUGGESTION_CACHE_TTL = 1800

_suggestion_cache: dict | None = None

FALLBACK_SUGGESTIONS = [
    "What logistics services does SRL offer?",
    "How do I request a quote on this website?",
    "Do you provide cloud hosting and managed IT support?",
    "What software or database solutions can you build?",
    "How can I contact your team in Honiara?",
]


def is_ai_enabled() -> bool:
    if CHAT_AI_PROVIDER == "openai":
        return bool(OPENAI_API_KEY)
    if CHAT_AI_PROVIDER == "gemini":
        return bool(GEMINI_API_KEY)
    return bool(OPENAI_API_KEY or GEMINI_API_KEY)


def get_chat_status() -> dict:
    if OPENAI_API_KEY and CHAT_AI_PROVIDER in ("auto", "openai", ""):
        return {"aiEnabled": True, "provider": "openai", "model": OPENAI_MODEL}
    if GEMINI_API_KEY and CHAT_AI_PROVIDER in ("auto", "gemini"):
        return {"aiEnabled": True, "provider": "gemini", "model": GEMINI_MODEL}
    if OPENAI_API_KEY:
        return {"aiEnabled": True, "provider": "openai", "model": OPENAI_MODEL}
    if GEMINI_API_KEY:
        return {"aiEnabled": True, "provider": "gemini", "model": GEMINI_MODEL}
    return {"aiEnabled": False, "provider": None, "model": None}


def get_welcome_message() -> str:
    info = _contact_info()
    return (
        f"Welcome to {info['company']} Pages.\n\n"
        "Please tell me what you need or would like to search for on this website. "
        "I can help you find services, pages, quotes, and contact details."
    )


def get_chat_welcome() -> dict:
    status = get_chat_status()
    questions, powered_by = _get_suggested_questions()
    return {
        "welcomeMessage": get_welcome_message(),
        "suggestedQuestions": questions,
        "aiEnabled": status["aiEnabled"],
        "provider": status.get("provider"),
        "poweredBy": powered_by,
    }


def _contact_info() -> dict:
    branding = get_site_content().get("branding") or {}
    contact = branding.get("contact") or {}
    consultation = branding.get("consultation") or {}
    return {
        "company": branding.get("companyName", "SRL Logistics & Holdings"),
        "email": contact.get("email", "info@srllogisticsandholdings.com"),
        "phone": contact.get("phone", "+677 7885155"),
        "address": contact.get("address", "Green Valley, East Honiara, Solomon Islands"),
        "hours": contact.get("hours", "Mon – Fri: 8:00 AM – 6:00 PM"),
        "consultation": consultation.get("hoursNote", "Free consultations during business hours"),
    }


def _service_lines() -> list[str]:
    content = get_site_content()
    lines = []
    for group in ("services", "softwareSubServices", "itServices", "hostedSolutions"):
        for svc in content.get(group, []):
            title = svc.get("title", "")
            desc = svc.get("shortDescription", "")
            slug = svc.get("slug", "")
            if title:
                lines.append(f"- {title}: {desc} ({slug})")
    return lines[:30]


def _system_prompt() -> str:
    info = _contact_info()
    services = "\n".join(_service_lines())
    return (
        f"You are the official AI assistant for {info['company']} in the Solomon Islands.\n"
        "Answer visitor questions accurately, professionally, and in plain language.\n\n"
        f"Company contact:\n"
        f"- Email: {info['email']}\n"
        f"- Phone: {info['phone']}\n"
        f"- Address: {info['address']}\n"
        f"- Hours: {info['hours']}\n"
        f"- Consultation: {info['consultation']}\n\n"
        f"Services we offer:\n{services}\n\n"
        "Guidelines:\n"
        "- Keep replies concise (2-5 sentences) unless the user asks for detail.\n"
        "- Help visitors search and navigate this website — suggest relevant pages and services.\n"
        "- Direct users to /quote for pricing quotes and /contact for direct enquiries.\n"
        "- Mention relevant service pages (e.g. /services/logistics) when helpful.\n"
        "- Do not invent prices, timelines, or guarantees.\n"
        "- If unsure, suggest contacting the team by email or phone.\n"
        "- You may discuss projects like the Waste Management Database Portal and ANZ logistics work."
    )


def _suggestion_prompt() -> str:
    info = _contact_info()
    services = "\n".join(_service_lines()[:12])
    return (
        f"Generate exactly 5 short questions a first-time visitor might ask on the {info['company']} website.\n"
        "Cover logistics, cloud hosting, software, IT, Starlink, quotes, and contact.\n"
        "Each question must be under 90 characters, friendly, and specific to SRL.\n"
        f"Services context:\n{services}\n\n"
        "Return ONLY a JSON array of 5 strings. No markdown, no numbering, no extra text."
    )


def _parse_question_list(raw: str) -> list[str]:
    text = (raw or "").strip()
    if text.startswith("```"):
        text = re.sub(r"^```(?:json)?\s*", "", text)
        text = re.sub(r"\s*```$", "", text)
    try:
        data = json.loads(text)
        if isinstance(data, list):
            questions = [str(item).strip() for item in data if str(item).strip()]
            return [q[:120] for q in questions[:5]]
    except json.JSONDecodeError:
        pass
    return []


def _openai_raw(prompt: str, system: str | None = None) -> str | None:
    if not OPENAI_API_KEY:
        return None
    messages = []
    if system:
        messages.append({"role": "system", "content": system})
    messages.append({"role": "user", "content": prompt})
    payload = json.dumps(
        {
            "model": OPENAI_MODEL,
            "messages": messages,
            "max_tokens": 220,
            "temperature": 0.8,
        }
    ).encode("utf-8")
    req = urllib.request.Request(
        "https://api.openai.com/v1/chat/completions",
        data=payload,
        headers={
            "Authorization": f"Bearer {OPENAI_API_KEY}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=25) as resp:
            data = json.loads(resp.read().decode("utf-8"))
        return data["choices"][0]["message"]["content"].strip()
    except (urllib.error.URLError, urllib.error.HTTPError, KeyError, IndexError, json.JSONDecodeError):
        return None


def _gemini_raw(prompt: str, system: str | None = None) -> str | None:
    if not GEMINI_API_KEY:
        return None
    url = (
        f"https://generativelanguage.googleapis.com/v1beta/models/{GEMINI_MODEL}"
        f":generateContent?key={GEMINI_API_KEY}"
    )
    body: dict = {
        "contents": [{"role": "user", "parts": [{"text": prompt}]}],
        "generationConfig": {"temperature": 0.8, "maxOutputTokens": 220},
    }
    if system:
        body["systemInstruction"] = {"parts": [{"text": system}]}
    payload = json.dumps(body).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=payload,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=25) as resp:
            data = json.loads(resp.read().decode("utf-8"))
        return data["candidates"][0]["content"]["parts"][0]["text"].strip()
    except (urllib.error.URLError, urllib.error.HTTPError, KeyError, IndexError, json.JSONDecodeError):
        return None


def _generate_ai_suggestions() -> tuple[list[str], str]:
    prompt = _suggestion_prompt()
    providers = []
    if CHAT_AI_PROVIDER == "openai":
        providers = ["openai"]
    elif CHAT_AI_PROVIDER == "gemini":
        providers = ["gemini"]
    else:
        providers = ["openai", "gemini"]

    for provider in providers:
        raw = _openai_raw(prompt) if provider == "openai" else _gemini_raw(prompt)
        questions = _parse_question_list(raw or "")
        if len(questions) >= 3:
            return questions[:5], provider
    return FALLBACK_SUGGESTIONS, "fallback"


def _get_suggested_questions() -> tuple[list[str], str]:
    global _suggestion_cache
    now = time.time()
    if _suggestion_cache and now - _suggestion_cache["ts"] < SUGGESTION_CACHE_TTL:
        return _suggestion_cache["questions"], _suggestion_cache["powered_by"]

    if is_ai_enabled():
        questions, powered_by = _generate_ai_suggestions()
    else:
        questions, powered_by = FALLBACK_SUGGESTIONS, "fallback"

    _suggestion_cache = {"ts": now, "questions": questions, "powered_by": powered_by}
    return questions, powered_by


def _normalize_history(history: list[dict] | None) -> list[dict]:
    if not history:
        return []
    messages = []
    for item in history[-MAX_HISTORY:]:
        role = item.get("role")
        content = (item.get("content") or item.get("message") or "").strip()
        if role in ("user", "assistant") and content:
            messages.append({"role": role, "content": content[:2000]})
    return messages


def _openai_reply(message: str, history: list[dict]) -> str | None:
    if not OPENAI_API_KEY:
        return None

    messages = [{"role": "system", "content": _system_prompt()}]
    messages.extend(history)
    messages.append({"role": "user", "content": message[:2000]})

    payload = json.dumps(
        {
            "model": OPENAI_MODEL,
            "messages": messages,
            "max_tokens": MAX_TOKENS,
            "temperature": 0.7,
        }
    ).encode("utf-8")

    req = urllib.request.Request(
        "https://api.openai.com/v1/chat/completions",
        data=payload,
        headers={
            "Authorization": f"Bearer {OPENAI_API_KEY}",
            "Content-Type": "application/json",
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = json.loads(resp.read().decode("utf-8"))
        return data["choices"][0]["message"]["content"].strip()
    except (urllib.error.URLError, urllib.error.HTTPError, KeyError, IndexError, json.JSONDecodeError):
        return None


def _gemini_reply(message: str, history: list[dict]) -> str | None:
    if not GEMINI_API_KEY:
        return None

    contents = []
    for item in history:
        role = "user" if item["role"] == "user" else "model"
        contents.append({"role": role, "parts": [{"text": item["content"]}]})
    contents.append({"role": "user", "parts": [{"text": message[:2000]}]})

    url = (
        f"https://generativelanguage.googleapis.com/v1beta/models/{GEMINI_MODEL}"
        f":generateContent?key={GEMINI_API_KEY}"
    )
    payload = json.dumps(
        {
            "systemInstruction": {"parts": [{"text": _system_prompt()}]},
            "contents": contents,
            "generationConfig": {"temperature": 0.7, "maxOutputTokens": MAX_TOKENS},
        }
    ).encode("utf-8")

    req = urllib.request.Request(
        url,
        data=payload,
        headers={"Content-Type": "application/json"},
        method="POST",
    )

    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = json.loads(resp.read().decode("utf-8"))
        return data["candidates"][0]["content"]["parts"][0]["text"].strip()
    except (urllib.error.URLError, urllib.error.HTTPError, KeyError, IndexError, json.JSONDecodeError):
        return None


def _rule_based_reply(message: str) -> str:
    text = message.lower().strip()
    info = _contact_info()

    if re.search(r"\b(hi|hello|hey|good morning|good afternoon|bula|welcome)\b", text):
        return get_welcome_message()

    if re.search(r"\b(quote|pricing|price|cost|estimate|how much)\b", text):
        return (
            "You can request a custom quote at /quote — we typically respond within 24 hours on business days. "
            f"Or email us at {info['email']} with your project details."
        )

    if re.search(r"\b(cloud|hosting|server|migration|infrastructure)\b", text):
        return (
            "SRL offers secure cloud hosting, managed servers, and zero-downtime migration. "
            "Browse /services/cloud-hosting or our hosted business systems at /services."
        )

    if re.search(r"\b(logistics|transport|fleet|warehouse|delivery)\b", text):
        return (
            "Our logistics services include fleet management, warehousing, route optimization, and airport delivery. "
            "See /services/logistics or visit /quote for a tailored proposal."
        )

    if re.search(r"\b(software|develop|app|database|portal|system)\b", text):
        return (
            "We build custom software — web apps, mobile apps, databases, fleet systems, and waste management portals. "
            "Explore /services/software-development for more."
        )

    if re.search(r"\b(starlink|satellite|internet|wifi|connectivity)\b", text):
        return (
            "SRL deploys Starlink and network solutions across the Solomon Islands. "
            "Learn more at /services/starlink-deployments."
        )

    if re.search(r"\b(contact|email|phone|call|reach|hours|location|address)\b", text):
        return (
            f"Contact {info['company']}:\n"
            f"Email: {info['email']}\n"
            f"Phone: {info['phone']}\n"
            f"Hours: {info['hours']}\n"
            "Visit /contact to send a message."
        )

    return (
        f"I'm here to help with {info['company']} services. "
        f"Ask about a specific service, visit /quote, or email {info['email']}."
    )


def generate_chat_reply(message: str, history: list[dict] | None = None) -> tuple[str, str]:
    cleaned = (message or "").strip()
    if not cleaned:
        return "Please type a message and I'll do my best to help.", "fallback"

    normalized = _normalize_history(history)

    providers = []
    if CHAT_AI_PROVIDER == "openai":
        providers = ["openai"]
    elif CHAT_AI_PROVIDER == "gemini":
        providers = ["gemini"]
    else:
        providers = ["openai", "gemini"]

    for provider in providers:
        if provider == "openai":
            reply = _openai_reply(cleaned, normalized)
            if reply:
                return reply, "openai"
        if provider == "gemini":
            reply = _gemini_reply(cleaned, normalized)
            if reply:
                return reply, "gemini"

    return _rule_based_reply(cleaned), "fallback"
