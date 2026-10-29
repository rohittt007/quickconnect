"""
Support Tickets API
-------------------
POST /api/tickets/create  — submit a new support ticket (authenticated users)
GET  /api/tickets/all     — fetch all tickets (admin only, token-gated)
PATCH /api/tickets/{id}/resolve — mark a ticket resolved (admin only)
"""

import time
import uuid
from typing import Dict, List, Literal, Optional

from fastapi import APIRouter, Header, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix="/api/tickets", tags=["Support Tickets"])

# ---------------------------------------------------------------------------
# In-memory store  (replace with a real DB later)
# ---------------------------------------------------------------------------
_tickets_db: Dict[str, dict] = {}


# ---------------------------------------------------------------------------
# Schemas
# ---------------------------------------------------------------------------
class CreateTicketPayload(BaseModel):
    user_name: str
    user_email: str
    category: Literal["general", "technical", "billing", "issue"]
    subject: str
    description: str
    priority: Literal["Normal", "High", "Critical"] = "Normal"


class TicketOut(BaseModel):
    id: str
    user_name: str
    user_email: str
    category: str
    subject: str
    description: str
    priority: str
    status: str
    created_at: str


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
def _require_token(authorization: Optional[str]) -> str:
    """Very lightweight token check — just verifies the header is present."""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Authentication required.")
    return authorization.removeprefix("Bearer ").strip()


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------
@router.post("/create", response_model=TicketOut, status_code=201)
def create_ticket(
    payload: CreateTicketPayload,
    authorization: Optional[str] = Header(default=None),
) -> TicketOut:
    """Submit a new support ticket. Requires a valid Bearer token."""
    _require_token(authorization)

    if not payload.user_name.strip():
        raise HTTPException(status_code=400, detail="User name is required.")
    if not payload.description.strip():
        raise HTTPException(status_code=400, detail="Description is required.")

    ticket_id = f"TKT-{uuid.uuid4().hex[:8].upper()}"
    created_at = time.strftime("%Y-%m-%d %H:%M", time.localtime())

    ticket = {
        "id": ticket_id,
        "user_name": payload.user_name.strip(),
        "user_email": payload.user_email.strip().lower(),
        "category": payload.category,
        "subject": payload.subject.strip(),
        "description": payload.description.strip(),
        "priority": payload.priority,
        "status": "Pending",
        "created_at": created_at,
    }
    _tickets_db[ticket_id] = ticket
    return TicketOut(**ticket)


@router.get("/all", response_model=List[TicketOut])
def get_all_tickets(
    authorization: Optional[str] = Header(default=None),
) -> List[TicketOut]:
    """Return all tickets. Requires a valid Bearer token (admin use)."""
    _require_token(authorization)
    return [TicketOut(**t) for t in reversed(list(_tickets_db.values()))]


@router.patch("/{ticket_id}/resolve", response_model=TicketOut)
def resolve_ticket(
    ticket_id: str,
    authorization: Optional[str] = Header(default=None),
) -> TicketOut:
    """Mark a specific ticket as Resolved. Requires a valid Bearer token."""
    _require_token(authorization)
    ticket = _tickets_db.get(ticket_id)
    if not ticket:
        raise HTTPException(status_code=404, detail=f"Ticket {ticket_id} not found.")
    ticket["status"] = "Resolved"
    return TicketOut(**ticket)
